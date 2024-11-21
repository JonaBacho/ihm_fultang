package parser;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilderFactory;

public class UMLFileParser {
    private NodeList mxCells;

    public UMLFileParser(String filepath) {
        try {
            Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(filepath);
            this.mxCells = doc.getElementsByTagName("mxCell");
        } catch (Exception e) {
            System.out.println("Erreur lors de l'analyse du fichier : " + e);
            e.printStackTrace();
        }
    }

    public NodeList getMxCells() {
        return mxCells;
    }
}
