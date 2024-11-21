package models;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UMLAttribute {
    private String visibility;
    private String name;
    private String type;

    public UMLAttribute(String attribute) {
        // Expression régulière pour décomposer l'attribut
        String regex = "([+|-|#]?)\\s*([a-zA-Z_][a-zA-Z0-9_]*):\\s*([a-zA-Z][a-zA-Z0-9_]*)?";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(attribute);

        // Vérifier la correspondance avant d'accéder aux groupes
        if (matcher.find()) {
            this.visibility = parseVisibility(matcher.group(1) == null ? "" : matcher.group(1));
            this.name = matcher.group(2);
            this.type = matcher.group(3) != null ? matcher.group(3) : "";
        } else {
            System.out.println("Format d'attribut UML incorrect : " + attribute);
            throw new IllegalArgumentException("Format d'attribut UML incorrect : " + attribute);
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

    // Getters pour la visibilité, le nom et le type
    public String getVisibility() { return visibility; }
    public String getName() { return name; }
    public String getType() { return type; }
}
