package generator;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import models.UMLAttribute;
import models.UMLClass;
import models.UMLMethod;
import models.UMLRelation;
import utils.GenerateForAttribute;

public class JavaClassGenerator {

    private final String folderPath;

    public JavaClassGenerator(String folderPath) {
        this.folderPath = folderPath;
    }

    public void generateJavaFile(UMLClass umlClass) {
        String className = umlClass.getClassName();
        String filePath = folderPath + "/" + className + ".java";

        createFolderIfNotExists();

        try (FileWriter writer = new FileWriter(new File(filePath))) {
            System.out.println("Generating class " + className + ".java...........................");
            // Write file content
            System.out.println("Generating imports statements...........................");
            writeImports(writer, umlClass.getRelations());
            System.out.println("Generating class declaration...........................");
            writeClassDefinition(writer, className, umlClass.getRelations());
            System.out.println("Generating attributes...........................");
            writeAttributes(writer, umlClass);
            System.out.println("Generating methods...........................");
            writeConstructors(writer, umlClass);
            writeMethods(writer, umlClass);

            writer.write("}\n");
            System.out.println("*************************** Class Generated! **********************************");
        } catch (IOException e) {
            System.err.println("Error generating class " + className + ": " + e.getMessage());
        }
    }

    private void createFolderIfNotExists() {
        File folder = new File(folderPath);
        if (!folder.exists() && !folder.mkdirs()) {
            System.err.println("Failed to create directory: " + folderPath);
        }
    }

    private void writeImports(FileWriter writer, List<UMLRelation> relations) throws IOException {
        boolean needsListImports = relations.stream()
                .anyMatch(r -> r.getType().equals("Aggregation") || r.getType().equals("Composition"));
        if (needsListImports) {
            writer.write("import java.util.List;\nimport java.util.ArrayList;\n");
        }

        relations.stream()
                .map(UMLRelation::getTarget)
                .distinct()
                .forEach(target -> {
                    try {
                        writer.write("import " + target + ";\n");
                    } catch (IOException e) {
                        System.err.println("Error writing imports: " + e.getMessage());
                    }
                });

        writer.write("\n");
    }

    private void writeClassDefinition(FileWriter writer, String className, List<UMLRelation> relations) throws IOException {
        String extendsDefinition = relations.stream()
                .filter(r -> r.getType().equals("Extends"))
                .map(UMLRelation::getTarget)
                .collect(Collectors.joining(", "));

        if (!extendsDefinition.isEmpty()) {
            extendsDefinition = " extends " + extendsDefinition;
        }

        writer.write("public class " + className + extendsDefinition + " {\n");
    }

    private void writeAttributes(FileWriter writer, UMLClass umlClass) throws IOException {
        for (UMLAttribute attribute : umlClass.getAttributes()) {
            writer.write("\t" + attribute.getVisibility() + " " + attribute.getType() + " " + attribute.getName() + ";\n");
        }

        umlClass.getRelations().stream()
                .filter(r -> r.getType().equals("Aggregation"))
                .forEach(aggregation -> {
                    try {
                        String target = aggregation.getTarget();
                        writer.write("\tList<" + target + "> " + target.toLowerCase() + "s = new ArrayList<>();\n");
                    } catch (IOException e) {
                        System.err.println("Error writing attributes: " + e.getMessage());
                    }
                });

        umlClass.getRelations().stream()
                .filter(r -> r.getType().equals("Composition"))
                .forEach(composition -> {
                    try {
                        String target = composition.getTarget();
                        String variableName = target.substring(0, 1).toLowerCase() + target.substring(1);
                        writer.write("\tprivate " + target + " " + variableName + ";\n");
                    } catch (IOException e) {
                        System.err.println("Error writing composition attributes: " + e.getMessage());
                    }
                });

        writer.write("\n");
    }

    private void writeConstructors(FileWriter writer, UMLClass umlClass) throws IOException {
        // Default constructor
        writer.write("\tpublic " + umlClass.getClassName() + "() {\n\t\t// Default constructor\n\t}\n\n");

        // Complete constructor
        writer.write("\tpublic " + umlClass.getClassName() + "(");

        // Add attributes to constructor
        String attributes = umlClass.getAttributes().stream()
                .map(attr -> attr.getType() + " " + attr.getName())
                .collect(Collectors.joining(", "));

        // Add composition relations to constructor
        String compositions = umlClass.getRelations().stream()
                .filter(r -> r.getType().equals("Composition"))
                .map(comp -> comp.getTarget() + " " + comp.getTarget().substring(0, 1).toLowerCase() + comp.getTarget().substring(1))
                .collect(Collectors.joining(", "));

        String constructorArgs = attributes.isEmpty() ? compositions : attributes + ", " + compositions;
        writer.write(constructorArgs + ") {\n");

        // Initialize attributes
        for (UMLAttribute attribute : umlClass.getAttributes()) {
            writer.write("\t\tthis." + attribute.getName() + " = " + attribute.getName() + ";\n");
        }

        // Initialize composition relations
        umlClass.getRelations().stream()
                .filter(r -> r.getType().equals("Composition"))
                .forEach(comp -> {
                    String variableName = comp.getTarget().substring(0, 1).toLowerCase() + comp.getTarget().substring(1);
                    try {
                        writer.write("\t\tthis." + variableName + " = " + variableName + ";\n");
                    } catch (IOException e) {
                        System.err.println("Error writing constructor: " + e.getMessage());
                    }
                });

        writer.write("\t}\n\n");
    }

    private void writeMethods(FileWriter writer, UMLClass umlClass) throws IOException {
        for (UMLMethod method : umlClass.getMethods()) {
            writer.write("\t" + method.getVisibility() + " " + method.getReturnType() + " " +
                    method.getMethodName() + "(" + method.getParameters() + ") {\n\t\t// TODO: implement method\n\t}\n");
        }

        for (UMLAttribute attribute : umlClass.getAttributes()) {
            writer.write("\t" + GenerateForAttribute.getters(attribute.getName(), attribute.getType()));
            writer.write("\t" + GenerateForAttribute.setters(attribute.getName(), attribute.getType()));
        }

        umlClass.getRelations().stream()
                .filter(r -> r.getType().equals("Composition"))
                .forEach(comp -> {
                    try {
                        String target = comp.getTarget();
                        String variableName = target.substring(0, 1).toLowerCase() + target.substring(1);
                        writer.write("\t" + GenerateForAttribute.getters(variableName, target));
                        writer.write("\t" + GenerateForAttribute.setters(variableName, target));
                    } catch (IOException e) {
                        System.err.println("Error writing composition methods: " + e.getMessage());
                    }
                });

        writer.write("\n");
    }
}
