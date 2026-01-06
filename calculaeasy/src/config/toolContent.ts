export interface ToolContentSection {
    title: string;
    content: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface ToolContent {
    howItWorks: ToolContentSection;
    example: ToolContentSection;
    faqs: FAQ[];
}

export type ToolContentId =
    | "iva-uruguay"
    | "sueldo-liquido-uruguay"
    | "aguinaldo-uruguay"
    | "conversor-sueldo-uruguay"
    | "horas-extra-uruguay"
    | "salario-vacacional-uruguay";

export const toolContent: Record<ToolContentId, ToolContent> = {
"aguinaldo-uruguay": {
  howItWorks: {
    title: "Cómo se calcula el aguinaldo en Uruguay",
    content: `
      <p class="mb-4">
        El <strong>aguinaldo</strong> (Sueldo Anual Complementario) se calcula como la 
        <strong>doceava parte</strong> del total de remuneraciones generadas en el semestre.
      </p>

      <p class="mb-4">En otras palabras:</p>

      <div class="bg-indigo-50 border-l-4 border-indigo-600 p-4 mb-4">
        <p class="font-semibold text-indigo-900">
          Aguinaldo = Total ganado en el semestre / 12
        </p>
      </div>

      <p class="mb-4">
        Si trabajaste menos de 6 meses en el semestre, el aguinaldo se calcula de forma proporcional:
        se toma lo ganado en los meses trabajados y se divide por 12.
      </p>

      <p class="mb-4">
        Esta herramienta muestra una estimación sobre valores <strong>nominales</strong> (brutos). 
        El monto que recibís en mano puede variar porque el aguinaldo también puede tener descuentos 
        legales (aportes y, según el caso, IRPF).
      </p>

      <p class="text-sm text-slate-600">
        Tip: si tu remuneración varía (comisiones, extras, bonos), lo más preciso es calcularlo usando 
        el <strong>total ganado en el semestre</strong>.
      </p>
    `,
  },

  example: {
    title: "Ejemplo de cálculo",
    content: `
      <p class="mb-4">
        Si tu sueldo nominal mensual promedio fue de <strong>$50.000</strong> y trabajaste el semestre completo:
      </p>

      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Total semestre: 50.000 × 6 = <strong>$300.000</strong></li>
        <li>Aguinaldo estimado: 300.000 / 12 = <strong>$25.000</strong></li>
      </ul>

      <p class="mb-4">
        Si trabajaste solo <strong>3 meses</strong>:
      </p>

      <ul class="list-disc list-inside space-y-2">
        <li>Total semestre: 50.000 × 3 = <strong>$150.000</strong></li>
        <li>Aguinaldo estimado: 150.000 / 12 = <strong>$12.500</strong></li>
      </ul>

      <p class="text-sm text-slate-600 mt-4">
        Nota: el aguinaldo se calcula con remuneraciones reales del semestre. Si hubo comisiones, horas extra o bonos,
        conviene sumar esos importes al total del semestre.
      </p>
    `,
  },

  faqs: [
    {
      question: "¿El aguinaldo se calcula sobre nominal o líquido?",
      answer:
        "Se calcula sobre el total nominal (bruto) ganado en el semestre. El monto final que cobrás puede tener descuentos legales (aportes y, según el caso, IRPF).",
    },
    {
      question: "¿Qué conceptos se incluyen en el aguinaldo?",
      answer:
        "En general incluye remuneraciones: sueldo base, horas extra, comisiones, incentivos y otros conceptos que integren la remuneración del semestre.",
    },
    {
      question: "¿Qué pasa si cobro comisiones o tengo bonos?",
      answer:
        "Si forman parte de tu remuneración y se pagaron en el semestre, se incluyen. Para mayor precisión, sumá el total efectivamente cobrado en el semestre y dividilo por 12.",
    },
    {
      question: "¿Se paga en junio y diciembre?",
      answer:
        "Sí. En Uruguay se paga dos veces al año: uno corresponde al semestre diciembre–mayo (se cobra usualmente en junio) y el otro al semestre junio–noviembre (se cobra usualmente en diciembre).",
    },
    {
      question: "¿Qué pasa si trabajé menos de 6 meses?",
      answer:
        "Se calcula proporcionalmente: se toma el total ganado en los meses trabajados dentro del semestre y se divide por 12.",
    },
  ],
},

    "sueldo-liquido-uruguay": {
  howItWorks: {
    title: "Cómo se calcula el sueldo líquido en Uruguay (2025)",
    content: `
      <p class="mb-4">
        El <strong>sueldo líquido</strong> es el monto que recibís en tu cuenta después de aplicar los principales 
        <strong>descuentos legales</strong> sobre tu sueldo nominal (bruto).
      </p>

      <p class="mb-4">Esta calculadora estima tu sueldo líquido restando:</p>

      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>
          <strong>Aporte jubilatorio (15%):</strong> contribución al sistema de seguridad social.
        </li>
        <li>
          <strong>FONASA (3% a 8%):</strong> aporte a salud. Varía según tu situación familiar 
          (hijos y si tu cónyuge/concubino está a cargo y no tiene cobertura SNIS propia).
        </li>
        <li>
          <strong>FRL (0,10%):</strong> Fondo de Reconversión Laboral.
        </li>
        <li>
          <strong>IRPF (2025):</strong> impuesto progresivo por franjas. Se calcula sobre la 
          <strong>base imponible</strong> (nominal menos aportes).
        </li>
      </ul>

      <p class="mb-4">
        Para el IRPF se usan las <strong>escalas mensuales 2025</strong> y se aplica una 
        <strong>deducción general estimada</strong> sobre el <strong>IRPF bruto</strong>:
      </p>

      <ul class="list-disc list-inside mb-4 space-y-2">
        <li><strong>14%</strong> si el nominal IRPF es ≤ <strong>$98.640</strong> (15 BPC).</li>
        <li><strong>8%</strong> si es mayor a <strong>$98.640</strong>.</li>
      </ul>

      <p class="text-sm text-slate-600">
        Nota: esta estimación corresponde al régimen general de trabajo dependiente. Puede variar por caja (BPS, Caja Profesional, etc.), 
        multiempleo, aportes adicionales o situaciones particulares.
      </p>
    `,
  },

  example: {
    title: "Ejemplo de cálculo",
    content: `
      <p class="mb-4">
        Para un sueldo nominal de <strong>$70.000</strong> sin hijos ni cónyuge/concubino a cargo sin SNIS:
      </p>

      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Aporte jubilatorio (15%): <strong>$10.500</strong></li>
        <li>FONASA (4,5%): <strong>$3.150</strong></li>
        <li>FRL (0,10%): <strong>$70</strong></li>
      </ul>

      <p class="mb-4">
        <strong>Base imponible IRPF:</strong> $70.000 − $13.720 = <strong>$56.280</strong>
      </p>

      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>IRPF bruto (por franjas): <strong>$1.025</strong></li>
        <li>Deducción general (14%): <strong>−$143</strong></li>
        <li><strong>IRPF neto:</strong> <strong>$881</strong></li>
      </ul>

      <p class="mb-4">
        <strong>Sueldo líquido aproximado:</strong> $70.000 − $14.601 = <strong>$55.399</strong>
      </p>

      <p class="text-sm text-slate-600">
        Nota: el IRPF puede variar según tu situación real (otros ingresos, retenciones, deducciones específicas).
      </p>
    `,
  },

  faqs: [
    {
      question: "¿Por qué mi sueldo líquido puede ser diferente al calculado?",
      answer:
        "Esta calculadora brinda una estimación basada en el régimen general dependiente. El resultado real puede variar si pertenecés a otra caja (Caja Profesional, Caja Bancaria, etc.), tenés multiempleo, aportes adicionales, AFAP, retenciones específicas o ingresos extra que impacten el IRPF.",
    },
    {
      question: "¿Cómo se calcula el FONASA y por qué cambia el porcentaje?",
      answer:
        "El FONASA se calcula como un porcentaje del sueldo nominal y varía según tu situación familiar. Para remuneraciones mayores a 2,5 BPC (con BPC 2025), puede ser 4,5% sin cargas, 6% con hijos, 6,5% si tenés cónyuge/concubino a cargo sin SNIS propio y 8% si se combinan hijos + cónyuge sin cobertura propia.",
    },
    {
      question: "¿Qué es el IRPF y cuándo se paga?",
      answer:
        "El IRPF (Impuesto a la Renta de las Personas Físicas) es un impuesto progresivo por franjas. Se aplica sobre la base imponible (nominal menos aportes). Si tu base imponible está por debajo del mínimo no imponible (MNIG), el IRPF puede ser 0.",
    },
    {
      question: "¿Esta calculadora aplica deducciones por hijos o cónyuge en el IRPF?",
      answer:
        "Actualmente, no. Esta versión utiliza una deducción general estimada (14% u 8%) sobre el IRPF bruto, pero no incluye deducciones específicas por dependientes en el IRPF. Sí toma en cuenta hijos y cónyuge sin SNIS propio para calcular el porcentaje de FONASA.",
    },
    {
      question: "¿Los descuentos se aplican sobre el aguinaldo también?",
      answer:
        "Sí, el aguinaldo suele tener aportes jubilatorios y FONASA. El IRPF puede verse afectado porque considera la renta total. Esta herramienta es una estimación mensual y no incluye el cálculo anual completo con aguinaldo.",
    },
  ],
},

"iva-uruguay": {
  howItWorks: {
    title: "Cómo funciona el IVA en Uruguay",
    content: `
      <p class="mb-4">
        El <strong>IVA</strong> (Impuesto al Valor Agregado) es un impuesto que se aplica sobre el consumo de bienes y servicios en Uruguay.
        Normalmente está incluido en el precio final que paga el consumidor.
      </p>

      <p class="mb-4">En Uruguay existen dos tasas principales:</p>

      <ul class="list-disc list-inside mb-4 space-y-2">
        <li><strong>IVA Básico (22%):</strong> tasa general para la mayoría de productos y servicios.</li>
        <li><strong>IVA Mínimo (10%):</strong> tasa reducida para algunos bienes y servicios definidos por normativa.</li>
      </ul>

      <p class="mb-4">Esta calculadora te permite:</p>

      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>
          <strong>Agregar IVA:</strong> partir de un precio <em>sin IVA</em> y obtener el precio final <em>con IVA</em>.
        </li>
        <li>
          <strong>Descontar IVA:</strong> partir de un precio <em>con IVA</em> y calcular el monto neto <em>sin impuesto</em> (y cuánto IVA incluye).
        </li>
      </ul>

      <div class="bg-indigo-50 border-l-4 border-indigo-600 p-4 mb-4">
        <p class="font-semibold text-indigo-900 mb-2">Fórmulas rápidas:</p>
        <ul class="list-disc list-inside space-y-1 text-indigo-900">
          <li><strong>Precio final = Precio sin IVA × (1 + tasa)</strong></li>
          <li><strong>Precio sin IVA = Precio con IVA ÷ (1 + tasa)</strong></li>
        </ul>
      </div>

      <p class="text-sm text-slate-600">
        Nota: además de las tasas 22% y 10%, existen casos especiales con tasa 0% (por ejemplo, algunas exportaciones), 
        pero no es lo más común para consumo cotidiano.
      </p>
    `,
  },

  example: {
    title: "Ejemplo de cálculo",
    content: `
      <p class="mb-4"><strong>Agregar IVA Básico (22%):</strong></p>

      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Precio sin IVA: $1.000</li>
        <li>IVA (22%): $220</li>
        <li>Precio final con IVA: <strong>$1.220</strong></li>
      </ul>

      <p class="mb-4"><strong>Descontar IVA Básico (22%):</strong></p>

      <ul class="list-disc list-inside space-y-2">
        <li>Precio con IVA: $1.220</li>
        <li>Precio sin IVA: 1.220 ÷ 1,22 = <strong>$1.000</strong></li>
        <li>IVA incluido: <strong>$220</strong></li>
      </ul>

      <p class="text-sm text-slate-600 mt-4">
        Consejo: si el precio está publicado al público, casi siempre ya incluye IVA. En presupuestos o facturación a empresas,
        puede aparecer como “más IVA”.
      </p>
    `,
  },

  faqs: [
    {
      question: "¿Cuándo uso IVA Básico y cuándo IVA Mínimo?",
      answer:
        "El IVA Básico (22%) es la tasa general. El IVA Mínimo (10%) aplica a determinados bienes y servicios definidos por normativa. Si no estás seguro, lo más confiable es revisar la factura o el comprobante, donde debería indicarse la tasa aplicada.",
    },
    {
      question: "¿Cómo sé si un precio incluye IVA o no?",
      answer:
        "En general, los precios al consumidor final se publican con IVA incluido. En presupuestos, compras a proveedores o facturación entre empresas, puede aparecer como precio neto “más IVA”. Siempre verificá si dice “IVA incluido” o “+ IVA”.",
    },
    {
      question: "¿Puedo descontar o recuperar el IVA de mis compras?",
      answer:
        "Solo podés descontar (recuperar) IVA si sos contribuyente de IVA (empresa o profesional inscripto) y la compra está relacionada con tu actividad gravada. Los consumidores finales no pueden recuperar el IVA de compras personales.",
    },
    {
      question: "¿Cómo calcular el IVA mínimo (10%)?",
      answer:
        "Para agregar IVA mínimo (10%), multiplicá el precio sin IVA por 1,10. Por ejemplo, $1.000 sin IVA → $1.100 con IVA. Para descontarlo, dividí el precio con IVA por 1,10. Por ejemplo, $1.100 con IVA → $1.000 sin IVA (IVA incluido: $100).",
    },
    {
      question: "¿Hay otros tipos de IVA además del 22% y 10%?",
      answer:
        "Sí. Existen casos especiales con tasa 0% (por ejemplo, algunas exportaciones) y exoneraciones en rubros específicos. Sin embargo, las tasas más frecuentes en el día a día son 22% (básico) y 10% (mínimo).",
    },
  ],
},

    "conversor-sueldo-uruguay": {
  howItWorks: {
    title: "Cómo funciona el conversor de sueldo",
    content: `
      <p class="mb-4">
        Esta herramienta te permite convertir tu <strong>sueldo mensual</strong> a valores aproximados por 
        <strong>hora, día, semana y año</strong>. Es útil para comparar ofertas, estimar tu tarifa o calcular tu valor hora.
      </p>

      <p class="mb-4">
        Para obtener un cálculo más realista, se usa un promedio mensual de días laborables:
      </p>

      <div class="bg-indigo-50 border-l-4 border-indigo-600 p-4 mb-4">
        <p class="font-semibold text-indigo-900 mb-2">Promedios usados:</p>
        <ul class="list-disc list-inside space-y-1 text-indigo-900">
          <li><strong>Días laborables/mes</strong> = (días por semana × 52) ÷ 12</li>
          <li><strong>Horas laborables/mes</strong> = días/mes × horas por día</li>
        </ul>
      </div>

      <p class="mb-4">Luego se calcula:</p>

      <ul class="list-disc list-inside mb-4 space-y-2">
        <li><strong>Sueldo por hora:</strong> sueldo mensual ÷ horas laborables/mes</li>
        <li><strong>Sueldo por día (jornal):</strong> sueldo por hora × horas por día</li>
        <li><strong>Sueldo por semana:</strong> sueldo por día × días por semana</li>
        <li><strong>Sueldo anual:</strong> sueldo mensual × 12</li>
      </ul>

      <p class="mb-4">
        Podés ajustar las <strong>horas por día</strong> y <strong>días por semana</strong> según tu jornada laboral.
      </p>

      <p class="text-sm text-slate-600">
        Nota: los resultados son aproximados y no consideran licencias, feriados u otros factores. 
        Los montos son <strong>nominales</strong> (antes de descuentos).
      </p>
    `,
  },

  example: {
    title: "Ejemplo de cálculo",
    content: `
      <p class="mb-4">
        Para un sueldo mensual de <strong>$50.000</strong> con jornada de <strong>8 horas</strong> por día y 
        <strong>5 días</strong> a la semana:
      </p>

      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Días/mes ≈ (5 × 52) ÷ 12 = <strong>21,67</strong></li>
        <li>Horas/mes ≈ 21,67 × 8 = <strong>173,36</strong></li>
        <li>Por hora: 50.000 ÷ 173,36 ≈ <strong>$288</strong></li>
        <li>Por día: 288 × 8 ≈ <strong>$2.304</strong></li>
        <li>Por semana: 2.304 × 5 ≈ <strong>$11.520</strong></li>
        <li>Anual: 50.000 × 12 = <strong>$600.000</strong></li>
      </ul>

      <p class="text-sm text-slate-600">
        Nota: estos cálculos son sobre sueldo nominal (bruto), antes de aportes e impuestos.
      </p>
    `,
  },

  faqs: [
    {
      question: "¿Por qué el valor por hora puede variar entre calculadoras?",
      answer:
        "Porque algunas calculadoras asumen 30 días por mes, otras usan 4 semanas exactas, y otras usan promedios laborales. Esta herramienta usa un promedio anual (52 semanas ÷ 12 meses) para estimar días y horas mensuales de trabajo.",
    },
    {
      question: "¿El cálculo incluye aguinaldo o salario vacacional?",
      answer:
        "No. Este conversor trabaja con el sueldo mensual. Aguinaldo y salario vacacional se pagan aparte y pueden cambiar el ingreso anual total, pero no están incluidos en estos valores.",
    },
    {
      question: "¿Puedo usar esto para estimar horas extra?",
      answer:
        "Sí. Conocer tu valor hora te ayuda a estimar horas extra, aunque el pago final depende de los recargos y del régimen de tu empresa. Para un cálculo más completo, usá la Calculadora de Horas Extra.",
    },
    {
      question: "¿Estos valores son líquidos o nominales?",
      answer:
        "Los valores mostrados son nominales (brutos), antes de aplicar descuentos como aportes jubilatorios, FONASA, FRL e IRPF. Para saber tu monto en mano, usá la Calculadora de Sueldo Líquido.",
    },
    {
      question: "¿Puedo ingresar el sueldo en dólares?",
      answer:
        "Sí, si la herramienta permite ingresar USD. Se convierte a UYU usando el tipo de cambio indicado y luego se calculan los valores por hora/día/semana.",
    },
  ],
},

    "horas-extra-uruguay": {
  howItWorks: {
    title: "Cómo se calculan las horas extra en Uruguay",
    content: `
      <p class="mb-4">
        Las <strong>horas extra</strong> son las horas trabajadas por encima de tu jornada habitual. 
        Por lo general, se pagan con un <strong>recargo</strong> sobre tu valor hora normal.
      </p>

      <p class="mb-4">
        Esta calculadora parte de tu <strong>valor hora</strong> (sueldo mensual ÷ horas mensuales estimadas según tu jornada)
        y aplica el recargo correspondiente.
      </p>

      <p class="mb-4">Los recargos más comunes son:</p>

      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>
          <strong>Hora extra simple (100%):</strong> se paga al doble de tu hora normal (×2). 
          Suele aplicarse en días laborables fuera del horario habitual.
        </li>
        <li>
          <strong>Hora extra en descanso o feriado (150%):</strong> se paga a 2,5 veces tu hora normal (×2,5).
        </li>
        <li>
          <strong>Recargo nocturno (20%):</strong> se suma para horas trabajadas entre <strong>22:00 y 06:00</strong>.
        </li>
      </ul>

      <p class="mb-4">
        Podés ajustar la cantidad de horas por día y días por semana para adaptar el cálculo a tu jornada real.
      </p>

      <p class="text-sm text-slate-600">
        Nota: los recargos pueden variar según el sector y convenios colectivos. Esta herramienta muestra una estimación basada en los criterios más comunes.
      </p>
    `,
  },

  example: {
    title: "Ejemplo de cálculo",
    content: `
      <p class="mb-4">
        Para un sueldo nominal de <strong>$40.000</strong> con jornada de <strong>8 horas</strong> por día y <strong>6 días</strong> por semana (≈ 192 horas mensuales):
      </p>

      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Valor hora normal: 40.000 ÷ 192 = <strong>$208</strong></li>
        <li>Hora extra simple (100%): 208 × 2 = <strong>$416</strong></li>
        <li>Hora extra en descanso/feriado (150%): 208 × 2,5 = <strong>$520</strong></li>
      </ul>

      <p class="mb-4">
        Si trabajaste <strong>5 horas extra simples</strong>:
      </p>

      <ul class="list-disc list-inside space-y-2">
        <li>Total estimado: 5 × 416 = <strong>$2.080</strong></li>
      </ul>

      <p class="text-sm text-slate-600 mt-4">
        Nota: el cálculo es nominal. El monto final puede tener descuentos (aportes, FONASA) y puede impactar el IRPF.
      </p>
    `,
  },

  faqs: [
    {
      question: "¿Las horas extra tienen descuentos?",
      answer:
        "Sí. Las horas extra forman parte de tu remuneración nominal, por lo que generalmente tienen descuentos como aportes jubilatorios, FONASA y pueden influir en el IRPF según tu ingreso total.",
    },
    {
      question: "¿Cuántas horas extra se pueden trabajar?",
      answer:
        "Depende del régimen y del sector. Existen límites generales y también excepciones por convenios colectivos. Si necesitás precisión legal para tu caso, conviene revisar tu convenio o consultar con tu empleador.",
    },
    {
      question: "¿Qué pasa si trabajo de noche y además es hora extra?",
      answer:
        "En muchos casos, el recargo nocturno puede sumarse al de hora extra. Por ejemplo, una hora extra simple (100%) con recargo nocturno (20%) podría estimarse como 220% del valor hora normal. La aplicación exacta puede variar según el convenio.",
    },
    {
      question: "¿El recargo se calcula sobre el sueldo nominal o líquido?",
      answer:
        "Se calcula sobre el sueldo nominal (bruto). Primero se determina el valor de la hora con recargo y luego se aplican los descuentos legales correspondientes.",
    },
    {
      question: "¿Por qué mi valor hora puede ser diferente al de esta calculadora?",
      answer:
        "Porque las horas mensuales dependen de tu jornada y del método usado (por ejemplo, 192 horas es típico de 8 horas × 6 días × 4 semanas). Esta herramienta permite ajustar horas por día y días por semana para aproximarse a tu caso real.",
    },
  ],
},

    "salario-vacacional-uruguay": {
  howItWorks: {
    title: "Cómo se calcula el salario vacacional en Uruguay",
    content: `
      <p class="mb-4">
        El <strong>salario vacacional</strong> es un monto que se paga al momento de tomar la licencia anual. 
        Se calcula en función de tu remuneración y la cantidad de días de licencia que vas a gozar.
      </p>

      <p class="mb-4">Una forma común de estimarlo es:</p>

      <div class="bg-indigo-50 border-l-4 border-indigo-600 p-4 mb-4">
        <p class="font-semibold text-indigo-900">
          Salario vacacional ≈ (Sueldo mensual ÷ 30) × Días de licencia
        </p>
      </div>

      <p class="mb-4">Aspectos importantes:</p>

      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>
          El cálculo se basa en valores <strong>nominales</strong> (brutos) y sirve como estimación rápida.
        </li>
        <li>
          En general, el salario vacacional se cobra como un pago separado al tomar la licencia.
        </li>
        <li>
          Puede influir en tu carga tributaria anual (por ejemplo, IRPF), dependiendo de tu ingreso total.
        </li>
        <li>
          Los días de licencia dependen de tu antigüedad (por ejemplo, 20 días para menos de 5 años, y aumenta con la antigüedad).
        </li>
      </ul>

      <p class="text-sm text-slate-600">
        Nota: el cálculo exacto puede variar según el sector, convenios colectivos y cómo se compone tu remuneración (sueldos variables, comisiones, etc.).
      </p>
    `,
  },

  example: {
    title: "Ejemplo de cálculo",
    content: `
      <p class="mb-4">
        Para un sueldo nominal de <strong>$45.000</strong> con <strong>20 días de licencia</strong>:
      </p>

      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Valor diario estimado: 45.000 ÷ 30 = <strong>$1.500</strong></li>
        <li>Salario vacacional estimado: 1.500 × 20 = <strong>$30.000</strong></li>
      </ul>

      <p class="mb-4">
        Con <strong>25 días de licencia</strong>:
      </p>

      <ul class="list-disc list-inside space-y-2">
        <li>Salario vacacional estimado: 1.500 × 25 = <strong>$37.500</strong></li>
      </ul>

      <p class="text-sm text-slate-600 mt-4">
        Nota: el salario vacacional real puede incluir ajustes según tu remuneración y el régimen aplicable.
      </p>
    `,
  },

  faqs: [
    {
      question: "¿El salario vacacional tiene descuentos?",
      answer:
        "Depende del régimen y del empleador. En muchos casos se paga como un monto adicional asociado a la licencia y puede tener un tratamiento distinto al sueldo mensual. Además, puede influir en el IRPF anual según tu ingreso total. Para precisión exacta, lo ideal es revisar tu recibo o consultar con RRHH.",
    },
    {
      question: "¿Cuántos días de licencia me corresponden?",
      answer:
        "Depende de tu antigüedad en la empresa. Un esquema común es: 20 días (menos de 5 años) y aumenta gradualmente con la antigüedad. Algunos convenios colectivos pueden establecer más días. Si tu empresa tiene un reglamento interno, conviene revisarlo.",
    },
    {
      question: "¿Cuándo se paga el salario vacacional?",
      answer:
        "Generalmente se paga antes de comenzar la licencia o al momento de tomar las vacaciones. La forma exacta depende del empleador y del régimen aplicable.",
    },
    {
      question: "¿Se calcula sobre el sueldo nominal o líquido?",
      answer:
        "Esta calculadora estima el salario vacacional sobre tu sueldo nominal mensual. El monto efectivo puede variar según descuentos, forma de pago y régimen aplicable.",
    },
    {
      question: "¿El salario vacacional se calcula siempre con (sueldo ÷ 30)?",
      answer:
        "Es una forma común de estimarlo, pero el cálculo exacto puede variar según sector, convenios y cómo se considera tu remuneración. Si tenés componentes variables (comisiones, premios), el promedio puede influir.",
    },
    {
      question: "¿Cuál es la diferencia entre licencia y salario vacacional?",
      answer:
        "La licencia son los días libres que te corresponden por vacaciones. El salario vacacional es el monto que se paga asociado a esos días de licencia. Es decir: la licencia es el descanso, y el salario vacacional es el pago que recibís al tomarte esas vacaciones (según el régimen y la forma de liquidación de tu empleador).",
    },
  ],
},

};
