import { Button } from "cherry-ui";
import { IconClose } from "cherry-ui/icons";
import React, { ReactNode, useEffect, useState } from "react"
import { CSSTransition } from "react-transition-group";
import './style/index.less'

export interface ModalProps {
    children:React.ReactNode,
    open?:boolean;
    title?:string;
    mask?:boolean;
    close?:boolean;
    footerType?:'default' | 'simple';
    footerItem?:React.ReactNode[];// 自定义footer
    onClose?:(event?:React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;

}

const Modal:React.FC<ModalProps> = (props) => {
    const {children,open=false,title,mask,close,footerType='default',footerItem,onClose,...restProps} = props;
    const [masked,setMasked] = useState(false);

    const onCancel = () => {
        if(typeof onClose == 'function'){
            onClose();
            console.log('opena:'+open)
        }
    }

    useEffect(()=>{
        console.log(open)
        console.log('masked:'+masked)
        if(open){
            setMasked(!masked)
        }else{
            if(masked){setMasked(false)}//避免首次渲染
        }
    },[open])

    // footer按钮类型
    const buttonArea: {default:ReactNode;simple:ReactNode} = {
        default:(
            <>
                <span className="footer-item" onClick={onCancel}>
                    <Button>取消</Button>
                </span>
                <span className="footer-item" onClick={onCancel}>
                    <Button>确定</Button>
                </span>
            </>
        ),
        simple:(
            <>
                <span className="footer-item" onClick={onCancel}>
                    <Button>知道了</Button>
                </span>
            </>
        )
    }

    return (
        open?<div className="cherry-modal">
            {/* 遮罩层 */}
            {mask && (
                <CSSTransition classNames='cherry-modal-mask' in={masked} timeout={300}>
                    <div className="modal-mask"></div>
                </CSSTransition>
            )}
            {/* 弹出内容 */}
            <CSSTransition classNames='cherry-modal-content' in={open} timeout={300}>
                <div className="modal-content">
                    <header className="modal-header">
                        {close && <div className="modal-close"><IconClose></IconClose></div>}
                        <div className="modal-title">{title}</div>
                    </header>

                    <div className="modal-body">{children}</div>

                    <footer className="modal-footer">
                        {
                            footerItem?footerItem.map((item,index)=>{
                                return (
                                    <span className="footer-item" key={index}>
                                        {item}
                                    </span>
                                )
                            }):buttonArea[footerType]
                        }
                    </footer>
                </div>
            </CSSTransition>
        </div>:null
    )
}

Modal.defaultProps={
    footerType:"default",
}

export default Modal