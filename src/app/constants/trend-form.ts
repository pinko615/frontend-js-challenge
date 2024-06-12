import { FormField } from "../interfaces/form-field.interface";

export const TREND_FORM_FIELDS: FormField[] = [
    { label: 'URL', name: 'url', type: 'text' },
    { label: 'Autor', name: 'provider', type: 'text' },
    { label: 'Título', name: 'title', type: 'text' },
    { label: 'Contenido', name: 'body', type: 'textarea' }
]