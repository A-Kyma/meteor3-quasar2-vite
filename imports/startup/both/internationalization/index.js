// @ts-ignore
import { I18n } from "meteor/akyma:bk";

// @ts-ignore
import fr from "./fr.doc.yaml"
// @ts-ignore
import nl from "./nl.doc.yaml"
// @ts-ignore
import en from "./en.doc.yaml"

console.log(fr);   
I18n.loadTranslations(fr) 
I18n.loadTranslations(nl);
I18n.loadTranslations(en);