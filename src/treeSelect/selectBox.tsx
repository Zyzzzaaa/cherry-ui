import React, { ChangeEvent, useEffect, useState } from "react";
import classNames from 'classnames';
import './style/index.less'

interface BoxProps {
    disabled?: boolean;
    checked?: boolean;
    indeterminate?: boolean;
    children?: React.ReactNode[] | string;
    onChange?: (e?: React.BaseSyntheticEvent) => void
}

const SelectBox: React.FC<BoxProps> = (props) => {
    const { disabled, checked = false, indeterminate = false, onChange, children, ...restprops } = props;
    const [inputChecked, setChecked] = useState(checked);
    const [half, setHalf] = useState(indeterminate)

    useEffect(() => {
        setChecked(checked)
        setHalf(indeterminate)
    }, [checked, half])

    // input的类名
    const classes = classNames('cherry-checkbox-input', {
        "is-checked": inputChecked,
        'icon-checkbox-fill': inputChecked,
        "half-checked": half,
    })
    // span的类名
    const spanClasses = classNames('cherry-selectbox-span', {
        "is-checked": inputChecked,
        "half-checked": inputChecked,
        'span-disabled': disabled
    })

    const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked)
        console.log('e.target:' + e.target.checked);
        console.log('inputCheked:' + inputChecked);
        onChange?.(e)
    }

    return (
        <label {...restprops} className="cherry-selectBox">
            <input type="checkbox"
                disabled={disabled}
                checked={inputChecked}
                className={classes}
                onChange={changeHandle} />
            <span className={spanClasses}>{children}</span>
        </label>
    )
}

export default SelectBox