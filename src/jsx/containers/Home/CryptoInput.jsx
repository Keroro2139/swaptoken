import React from 'react';
import { TextField, ListSubheader } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { VariableSizeList } from 'react-window';

import cryptocurrency from '../../../cryptocurrency.json';
import InputRef from './InputRef';

function getCryptoIcon(symbol) {
    return require(`../../../images/svg/cryptocurrency/${(symbol).toLocaleLowerCase()}.svg`)
}

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
    const { data, index, style } = props;
    return React.cloneElement(data[index], {
        style: {
            ...style,
            top: style.top + LISTBOX_PADDING,
        },
    });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
    const ref = React.useRef(null);
    React.useEffect(() => {
        if (ref.current != null) {
            ref.current.resetAfterIndex(0, true);
        }
    }, [data]);
    return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData = React.Children.toArray(children);
    const itemCount = itemData.length;
    const itemSize = 36;

    const getChildSize = (child) => {
        if (React.isValidElement(child) && child.type === ListSubheader) {
            return 36;
        }

        return itemSize;
    };

    const getHeight = () => {
        if (itemCount > 8) {
            return 8 * itemSize;
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
        <div ref={ref}>
            <OuterElementContext.Provider value={other}>
                <VariableSizeList
                    itemData={itemData}
                    height={getHeight() + 2 * LISTBOX_PADDING}
                    width="100%"
                    ref={gridRef}
                    outerElementType={OuterElementType}
                    innerElementType="ul"
                    itemSize={(index) => getChildSize(itemData[index])}
                    overscanCount={5}
                    itemCount={itemCount}
                >
                    {renderRow}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});

export default function CryptoInput({
    currency,
    control,
    handleChangeCurrency = () => { },
}) {

    const [focused, setFocused] = React.useState(false);

    const handleFocused = () => {
        setFocused(true);
    };

    const handleUnFocused = () => {
        setFocused(false);
    };

    return (
        <div className={`crypto-input-container ${focused ? 'focused' : ''}`}>
            <Autocomplete
                className='crypto-input-icon'
                options={cryptocurrency}
                autoHighlight
                disableListWrap
                getOptionLabel={(option) => option.symbol}
                getOptionSelected={(option, value) => option.symbol === value.symbol}
                ListboxComponent={ListboxComponent}
                noOptionsText='No item.'
                value={currency}
                onChange={handleChangeCurrency}
                renderOption={(option) => (
                    <>
                        <img
                            src={getCryptoIcon(option.symbol)}
                            alt="crypto-icon"
                            width='18px'
                        />
                        <span className='crypto-symbol'>{option.symbol}</span>
                    </>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant='standard'
                        onFocus={handleFocused}
                        onBlur={handleUnFocused}
                        inputProps={{
                            ...params.inputProps,
                            style: {
                                fontSize: '.875rem',
                                fontWeight: 400,
                            }
                        }}
                        InputProps={{
                            ...params.InputProps,
                            disableUnderline: true
                        }}
                    />
                )}
            />
            <InputRef
                name="usd_amount"
                control={control}
                rules={{ required: true }}
                props={{
                    autoFocus: true,
                    type: 'number',
                    className: 'crypto-input-send',
                    placeholder: '0',
                    onFocus: handleFocused,
                    onBlur: handleUnFocused,
                    InputProps: { disableUnderline: true },
                }}
            />
        </div>
    );
}
