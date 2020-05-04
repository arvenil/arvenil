import "./index.css"
import "bootswatch/cerulean/bootstrap.min.css"
import PdfFile from "./Kamil Dziedzic - Software Engineer.pdf"
import { saveAs } from 'file-saver';

saveAs(PdfFile, PdfFile)
