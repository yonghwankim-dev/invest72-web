const TAX_CONFIG = {
    NONE: {name: "NONE", rate: 0, readOnly: true, title: "없음"},
    STANDARD : {name:"STANDARD", rate: 15.4, readOnly: true, title: "표준과세"},
    NON_TAX: {name: "NON_TAX", rate: 0, readOnly: true, title: "비과세"},
    TAX_BENEFIT: {name: "TAX_BENEFIT", rate: 1.4, readOnly: false, title: "세금우대"}
};
const INVESTMENT_TYPE_CONFIG = {
    NONE : {name: "NONE", title: "없음"},
    CASH : {name: "CASH", title: "현금"},
    DEPOSIT : {name: "DEPOSIT", title: "예금"},
    SAVINGS : {name: "SAVINGS", title: "적금"}
}
const INTEREST_TYPE_CONFIG = {
    NONE : {name: "NONE", desc: "없음"},
    SIMPLE : {name: "SIMPLE", desc: "단리"},
    COMPOUND : {name: "COMPOUND", desc: "복리"},
}

export {TAX_CONFIG, INVESTMENT_TYPE_CONFIG, INTEREST_TYPE_CONFIG}