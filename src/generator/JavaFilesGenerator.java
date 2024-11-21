package generator;

import java.io.File;
import java.util.List;

import models.UMLClass;

public class JavaFilesGenerator {

    private final String folderPath;

    public JavaFilesGenerator(String umlFileName) {
        this.folderPath = "generated/" + umlFileName + "/";
    }

    public void generateJavaFiles(List<UMLClass> classes) {
        // Create the base directory if it doesn't exist
        File dir = new File(folderPath);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        // Use JavaClassGenerator to generate each class
        JavaClassGenerator classGenerator = new JavaClassGenerator(folderPath);
        for (UMLClass umlClass : classes) {
            classGenerator.generateJavaFile(umlClass);
        }
    }
}
