export interface RelatedTool {
    title: string;
    url: string;
    description: string;
    icon: string;
}

export type ToolId =
    | "iva-uruguay"
    | "sueldo-liquido-uruguay"
    | "aguinaldo-uruguay"
    | "conversor-sueldo-uruguay"
    | "horas-extra-uruguay"
    | "salario-vacacional-uruguay"
    | "indemnizacion-despido-uruguay";

export const relatedTools: Record<ToolId, RelatedTool[]> = {
    "iva-uruguay": [
        {
            title: "Calculadora de Sueldo Líquido",
            url: "/calculadoras/sueldo-liquido-uruguay",
            description: "Pasá de nominal a lo que te llega al bolsillo",
            icon: "/ilustraciones/sueldo.svg",
        },
        {
            title: "Calculadora de Aguinaldo",
            url: "/calculadoras/aguinaldo-uruguay",
            description: "Estimá cuánto vas a cobrar en junio o diciembre",
            icon: "/ilustraciones/aguinaldo.svg",
        },
        {
            title: "Conversor de Sueldo",
            url: "/calculadoras/conversor-sueldo-uruguay",
            description: "Convertí tu sueldo mensual a hora, día, semana y año",
            icon: "/ilustraciones/conversor.svg",
        },
    ],
    "sueldo-liquido-uruguay": [
        {
            title: "Calculadora de Aguinaldo",
            url: "/calculadoras/aguinaldo-uruguay",
            description: "Estimá cuánto vas a cobrar en junio o diciembre",
            icon: "/ilustraciones/aguinaldo.svg",
        },
        {
            title: "Calculadora de Horas Extra",
            url: "/calculadoras/horas-extra-uruguay",
            description: "Calculá el valor de tus horas simples y dobles",
            icon: "/ilustraciones/horas-extra.svg",
        },
        {
            title: "Calculadora de Salario Vacacional",
            url: "/calculadoras/salario-vacacional-uruguay",
            description: "Para planificar mejor tu descanso",
            icon: "/ilustraciones/vacacional.svg",
        },
    ],
    "aguinaldo-uruguay": [
        {
            title: "Calculadora de Sueldo Líquido",
            url: "/calculadoras/sueldo-liquido-uruguay",
            description: "Pasá de nominal a lo que te llega al bolsillo",
            icon: "/ilustraciones/sueldo.svg",
        },
        {
            title: "Conversor de Sueldo",
            url: "/calculadoras/conversor-sueldo-uruguay",
            description: "Convertí tu sueldo mensual a hora, día, semana y año",
            icon: "/ilustraciones/conversor.svg",
        },
        {
            title: "Calculadora de Salario Vacacional",
            url: "/calculadoras/salario-vacacional-uruguay",
            description: "Para planificar mejor tu descanso",
            icon: "/ilustraciones/vacacional.svg",
        },
    ],
    "conversor-sueldo-uruguay": [
        {
            title: "Calculadora de Sueldo Líquido",
            url: "/calculadoras/sueldo-liquido-uruguay",
            description: "Pasá de nominal a lo que te llega al bolsillo",
            icon: "/ilustraciones/sueldo.svg",
        },
        {
            title: "Calculadora de Horas Extra",
            url: "/calculadoras/horas-extra-uruguay",
            description: "Calculá el valor de tus horas simples y dobles",
            icon: "/ilustraciones/horas-extra.svg",
        },
        {
            title: "Calculadora de Aguinaldo",
            url: "/calculadoras/aguinaldo-uruguay",
            description: "Estimá cuánto vas a cobrar en junio o diciembre",
            icon: "/ilustraciones/aguinaldo.svg",
        },
    ],
    "horas-extra-uruguay": [
        {
            title: "Calculadora de Sueldo Líquido",
            url: "/calculadoras/sueldo-liquido-uruguay",
            description: "Pasá de nominal a lo que te llega al bolsillo",
            icon: "/ilustraciones/sueldo.svg",
        },
        {
            title: "Conversor de Sueldo",
            url: "/calculadoras/conversor-sueldo-uruguay",
            description: "Convertí tu sueldo mensual a hora, día, semana y año",
            icon: "/ilustraciones/conversor.svg",
        },
        {
            title: "Calculadora de Aguinaldo",
            url: "/calculadoras/aguinaldo-uruguay",
            description: "Estimá cuánto vas a cobrar en junio o diciembre",
            icon: "/ilustraciones/aguinaldo.svg",
        },
    ],
    "salario-vacacional-uruguay": [
        {
            title: "Calculadora de Sueldo Líquido",
            url: "/calculadoras/sueldo-liquido-uruguay",
            description: "Pasá de nominal a lo que te llega al bolsillo",
            icon: "/ilustraciones/sueldo.svg",
        },
        {
            title: "Calculadora de Aguinaldo",
            url: "/calculadoras/aguinaldo-uruguay",
            description: "Estimá cuánto vas a cobrar en junio o diciembre",
            icon: "/ilustraciones/aguinaldo.svg",
        },
        {
            title: "Conversor de Sueldo",
            url: "/calculadoras/conversor-sueldo-uruguay",
            description: "Convertí tu sueldo mensual a hora, día, semana y año",
            icon: "/ilustraciones/conversor.svg",
        },
    ],
    "indemnizacion-despido-uruguay": [
        {
            title: "Calculadora de Sueldo Líquido",
            url: "/calculadoras/sueldo-liquido-uruguay",
            description: "Pasá de nominal a lo que te llega al bolsillo",
            icon: "/ilustraciones/sueldo.svg",
        },
        {
            title: "Calculadora de Aguinaldo",
            url: "/calculadoras/aguinaldo-uruguay",
            description: "Estimá cuánto vas a cobrar en junio o diciembre",
            icon: "/ilustraciones/aguinaldo.svg",
        },
        {
            title: "Calculadora de Salario Vacacional",
            url: "/calculadoras/salario-vacacional-uruguay",
            description: "Para planificar mejor tu descanso",
            icon: "/ilustraciones/vacacional.svg",
        },
    ],
};
