import React from 'react';
import { TextField } from '@material-ui/core';
import { useController } from "react-hook-form";

function Input({ control, name, rules, props = {} }) {
    const {
        field: { ref, ...inputProps },
    } = useController({
        name,
        control,
        rules,
        defaultValue: "",
    });

    return (
        <TextField
            {...inputProps}
            {...props}
            defaultValue={inputProps.value}
            inputRef={ref}
            autoComplete='off'
        />
    );
}

export default Input;
