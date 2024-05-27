// src/components/LocalizedDatePicker.tsx
import React, { useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { enGB, uk } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

const locales = { en: enGB, uk };

interface LocalizedDatePickerProps {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    locale: 'en' | 'uk';
}

const LocalizedDatePicker: React.FC<LocalizedDatePickerProps> = ({ selected, onChange, locale }) => {
    useEffect(() => {
        registerLocale('en', enGB);
        registerLocale('uk', uk);
    }, [locale]);

    return (
        <DatePicker
            selected={selected}
            onChange={onChange}
            locale={locales[locale]}
            dateFormat="P"
        />
    );
};

export default LocalizedDatePicker;

