package models;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UMLMethod {
    private String visibility;
    private String methodName;
    private String parameters;
    private String returnType;

    public UMLMethod(String method) {
        // Expression régulière pour décomposer une méthode UML
        String regex = "([+|-|#]?)\\s*([a-zA-Z_][a-zA-Z0-9_]*)\\s*\\(([^)]*)\\)\\s*(?::\\s*([a-zA-Z][a-zA-Z0-9_]*))?";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(method);

        // Vérifier si une correspondance est trouvée avant d'accéder aux groupes
        if (matcher.find()) {
            this.visibility = parseVisibility(matcher.group(1) == null ? "" : matcher.group(1));
            this.methodName = matcher.group(2);
            this.parameters = matcher.group(3) != null ? matcher.group(3) : "";
            this.returnType = matcher.group(4) != null ? matcher.group(4) : "void";
        } else {
            System.err.println("Format de méthode UML incorrect : " + method);
            throw new IllegalArgumentException("Format de méthode UML incorrect : " + method);
        }
    }

    private String parseVisibility(String symbol) {
        switch (symbol) {
            case "+": return "public";
            case "-": return "private";
            case "#": return "protected";
            default: return "";
        }
    }

    // Getters pour la visibilité, le nom, les paramètres et le type de retour
    public String getVisibility() { return visibility; }
    public String getMethodName() { return methodName; }
    public String getParameters() { return parameters; }
    public String getReturnType() { return returnType; }
}
