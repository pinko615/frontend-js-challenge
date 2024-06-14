import { FormField } from "../interfaces/form-field.interface";

export const TREND_FORM_FIELDS: FormField[] = [
    { label: 'URL', name: 'url', type: 'text', placeholder: 'Indique URL' },
    { label: 'Autor', name: 'provider', type: 'text', placeholder: 'Indique autor' },
    { label: 'Título', name: 'title', type: 'text', placeholder: 'Indique titulo' },
    { label: 'Imagen', name: 'image', type: 'text', placeholder: 'Indique URL de la imagen' },
    { label: 'Contenido', name: 'body', type: 'textarea', placeholder: 'Escribe aqui' }
]