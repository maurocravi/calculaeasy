export interface Calculator {
    id: string;
    name: string;
    url: string;
    keywords: string[];
    description: string;
}

export const calculators: Calculator[] = [
    {
        id: "sueldo-liquido-uruguay",
        name: "Sueldo Líquido",
        url: "/calculadoras/sueldo-liquido-uruguay",
        keywords: ["sueldo", "liquido", "neto", "salario", "nominal", "mano", "aportes", "descuentos", "irpf", "fonasa", "en mano", "bps", "retenciones", "salario líquido", "sueldo liquido uruguay"],
        description: "Calculá tu sueldo en mano a partir del nominal"
    },
    {
        id: "conversor-sueldo-uruguay",
        name: "Conversor de Sueldo",
        url: "/calculadoras/conversor-sueldo-uruguay",
        keywords: ["conversor", "sueldo", "salario", "hora", "dia", "semana", "mes", "anual", "jornal", "valor hora", "por hora", "tarifa", "rate", "mensual a hora", "mensual a jornal"],
        description: "Desglosá tu sueldo mensual por hora, día, semana y año"
    },
    {
        id: "aguinaldo-uruguay",
        name: "Aguinaldo",
        url: "/calculadoras/aguinaldo-uruguay",
        keywords: ["aguinaldo", "sueldo", "anual", "complementario", "sac", "junio", "diciembre", "medio aguinaldo", "sueldo anual complementario", "aguinaldo junio", "aguinaldo diciembre", "proporcional"],
        description: "Calculá cuánto te corresponde de aguinaldo"
    },
    {
        id: "salario-vacacional-uruguay",
        name: "Salario Vacacional",
        url: "/calculadoras/salario-vacacional-uruguay",
        keywords: ["salario", "vacacional", "vacaciones", "licencia", "dias", "liccencia anual", "pago vacaciones", "jornada vacacional", "vacaciones pago"],
        description: "Calculá tu salario vacacional según días de licencia"
    },
    {
        id: "horas-extra-uruguay",
        name: "Horas Extra",
        url: "/calculadoras/horas-extra-uruguay",
        keywords: ["horas", "extra", "extras", "overtime", "recargo", "feriado", "nocturno", "horas extra", "horas extra uruguay", "hora nocturna", "nocturnidad", "domingo", "jornal"],
        description: "Calculá el valor de tus horas extra"
    },
    {
        id: "iva-uruguay",
        name: "IVA",
        url: "/calculadoras/iva-uruguay",
        keywords: ["iva", "impuesto", "valor", "agregado", "22", "10", "basico", "minimo", "sin iva", "con iva", "descontar iva", "agregar iva", "precio final", "neto"],
        description: "Calculá el IVA de tus compras o ventas"
    }
];

export function searchCalculators(query: string): Calculator[] {
    if (!query || query.trim().length === 0) {
        return [];
    }

    const normalizedQuery = query.toLowerCase().trim();

    return calculators.filter(calc => {
        // Search in name
        if (calc.name.toLowerCase().includes(normalizedQuery)) {
            return true;
        }

        // Search in keywords
        return calc.keywords.some(keyword =>
            keyword.toLowerCase().includes(normalizedQuery)
        );
    }).slice(0, 5); // Limit to top 5 results
}
