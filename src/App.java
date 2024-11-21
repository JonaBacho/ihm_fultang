import parser.UMLClassParser;
import parser.UMLFileParser;

import java.util.List;

import org.w3c.dom.NodeList;

import generator.JavaFilesGenerator;
import models.UMLClass;

public class App {
    public static void main(String[] args) throws Exception {
        UMLFileParser initParser = new UMLFileParser("resources/"+args[0]);
        JavaFilesGenerator generator = new JavaFilesGenerator(args[0]);
        NodeList mxCells = initParser.getMxCells();        
        UMLClassParser parser = new UMLClassParser(mxCells);
        List<UMLClass> classes = parser.parseClasses();
        generator.generateJavaFiles(classes);
    }
}
