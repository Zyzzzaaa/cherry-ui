import React, { useEffect, useRef, useState } from "react";
import { FixedSizeList } from "react-window";
import { Store } from "./store";
import { Node } from "./store/node";
import './style/index.less'
import { CheckBox } from 'cherry-ui-react';
import { NodeShow } from "./store/NodeShow";
import { RightOutlined } from '../icons';
import { Space } from 'cherry-ui-react';
import classNames from 'classnames';



export interface TreeOptions {
    id: string;
    name: string;
    children?: string
}

interface BaseTreeSelectProps {
    data?: Record<string, unknown>[];
    options?: TreeOptions;
    checkbox?: boolean;
    height?: number;
    accordion?: boolean;//只允许一个节点展开
    defaultCheckedKeys?: number[] | string[];
    defaultExpand?: number[] | string[];
    defaultExpandAll?: boolean;
}
type NativeTreeSelectProps = BaseTreeSelectProps & React.HTMLAttributes<HTMLElement>;
export type TreeSelectProps = Partial<NativeTreeSelectProps>

// 拍平数组
export const flattern = <T extends any[] = Record<string, any>[]>(arr: T, key = 'children'): Record<string, any>[] => {
    return arr.reduce((total, current) => {
        const isArray = Array.isArray(current[key])
        total.push(current)

        if (isArray) {
            total.push(...flattern(current[key], key))
        }
        return total
    }, [])
}

const TreeSelect: React.FC<TreeSelectProps> = (props) => {
    const { options = { id: 'id', name: 'name', children: 'children' },
        data = [],
        height,
        accordion,
        defaultCheckedKeys,
        defaultExpand,
        defaultExpandAll
    } = props;

    const store = new Store(data, {
        treeOptions: options,
        accordion
    })
    const treeRef = useRef(null)
    // 创建树
    const [tree, setTree] = useState(store.createTree(data));
    // 创建拍平树的列表
    const [flatternTree, setFlatternTree] = useState<Node[]>(flattern(tree) as Node[])
    // 自适应高度
    const [parentHeight, setParentHeight] = useState(0)

    useEffect(() => {
        setTree(store.createTree(data))
    }, [data])
    useEffect(() => {
        setFlatternTree(flattern(tree) as Node[])
    }, [tree])
    useEffect(() => {
        if (defaultCheckedKeys) store.setCheckedKeys(defaultCheckedKeys)
        if (defaultExpand) store.setExpandKeys(defaultExpand)
        if (defaultExpandAll) store.expandAll(defaultExpandAll)
    }, [defaultCheckedKeys, defaultExpand, defaultExpandAll])
    useEffect(() => {
        const observer = new MutationObserver((entries) => {
            const el = entries[0].target as HTMLElement;
            setParentHeight(height || el.offsetHeight)
        })
        if (treeRef.current) {
            observer.observe((treeRef.current as HTMLElement).parentNode as HTMLElement, {
                childList: true,
                subtree: true
            })
        }
        return (() => {
            observer.disconnect()
        })
    }, [height])

    // 判断是否展示node
    const showNode = (node: Node | null): boolean => {
        if (!node) return false;
        if (!node.parent?.collapse) return false;
        if (node.depth === 1) return true;
        return showNode(node.parent)
    }

    const treeNode = ({ data, index, style }: { data: Node[], index: number, style: React.CSSProperties }) => {
        const node = data[index];
        const changeHandle = (e: any) => {
            node.setChecked(e?.target.checked)
            setTree([...tree])
        }
        const arrowClasses = classNames('tree-arrow', {
            'tree-arrow-rotate': node.collapse
        })
        const openNode = () => {
            node.setCollapse(!node.collapse);
            setTree([...tree]);
        }

        return (
            <li key={node.id} className="tree-node"
                style={{ display: showNode(node) ? 'block' : 'none', marginLeft: `${(node.depth - 1) * 20}px`, ...style }}>
                <Space>
                    <NodeShow show={!!node.children && node.children.length !== 0}>
                        <div className={arrowClasses} onClick={openNode}><RightOutlined /></div>
                    </NodeShow>
                    <CheckBox checked={node.checked} indeterminate={node.indeterminate} onChange={changeHandle}>
                        {node.name}
                    </CheckBox>
                </Space>
            </li>
        )
    }
    const displayNode = flatternTree.filter(node => showNode(node))

    return (
        <div className="cherry-tree" ref={treeRef}>
            <FixedSizeList<Node[]>
                itemCount={displayNode.length}
                itemData={displayNode}
                itemSize={50}
                innerElementType='ul'
                width="100%"
                height={parentHeight}
                style={{ overflow: height ? 'auto' : 'none' }}>
                {treeNode}
            </FixedSizeList>
        </div>
    )
}

TreeSelect.defaultProps = {
    accordion: false,
    defaultExpandAll: false,
    defaultExpand: [],
    defaultCheckedKeys: []
}
export default TreeSelect