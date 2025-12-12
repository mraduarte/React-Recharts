//Função simples para moeda BRL - formatBRL(12900) // "R$ 12.900,00"
export function formatBRL(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

//Função robusta com fallback (evita bugs com undefined/null)
//formatMoney(null)      "R$ 0,00"
//formatMoney("9000")    "R$ 9.000,00"
//formatMoney(undefined) "R$ 0,00"
export function formatMoney(value) {
  const number = Number(value);

  if (isNaN(number)) return "R$ 0,00";

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

//Formato compacto (usado em dashboards)
//formatCompact(1200)     "1,2 mil"
//formatCompact(3500000)  "3,5 mi"
export function formatCompact(value) {
  return new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    compactDisplay: "short",
  }).format(value);
}

//Formatação configurável por locale
//formatCurrency(1000)                "R$ 1.000,00"
//formatCurrency(1000, "en-US", "USD") "$1,000.00"
//formatCurrency(1000, "ja-JP", "JPY") "￥1,000"

export function formatCurrency(
  value,
  locale = "pt-BR",
  currency = "BRL"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

