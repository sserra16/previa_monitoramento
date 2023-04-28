"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome_1 = __importDefault(require("selenium-webdriver/chrome"));
const service = new chrome_1.default.ServiceBuilder("./chromedriver.exe");
const options = new chrome_1.default.Options();
options.excludeSwitches("enable-logging");
const driver = new selenium_webdriver_1.Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .setChromeService(service)
    .build();
const url = "https://www.mercadolivre.com.br/";
const nomeDoProduto = "havaianas 4 nite preta";
const quantidadeProdutos = 4;
function main(url = "", nomeDoProduto = "") {
    return __awaiter(this, void 0, void 0, function* () {
        let isMercadoLivre = url.includes("mercadolivre");
        if (isMercadoLivre) {
            yield driver.get(url);
            let input = driver.findElement(selenium_webdriver_1.By.className("nav-search-input"));
            input.sendKeys(nomeDoProduto + selenium_webdriver_1.Key.ENTER);
            setTimeout(getPrecos, 5000);
        }
    });
}
function getPrecos() {
    return __awaiter(this, void 0, void 0, function* () {
        let precos = yield driver.findElements(selenium_webdriver_1.By.className("price-tag-fraction"));
        let listaPrecosString = [];
        for (let i = 0; i < quantidadeProdutos; i++) {
            listaPrecosString.push(yield precos[i].getText());
        }
        listaPrecosString.filter((a) => a.split("\n"));
        console.log(listaPrecosString);
    });
}
main(url, nomeDoProduto);
//# sourceMappingURL=index.js.map