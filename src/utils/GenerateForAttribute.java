package utils;

public class GenerateForAttribute {
    public static String getters(String attribute, String type){
        return "\tpublic " + type + " get" + attribute.substring(0, 1).toUpperCase() + attribute.substring(1) + "(){\n" +
                "\t\treturn this." + attribute + ";\n" +
                "\t}\n";
    }

    public static String setters(String attribute, String type){
        return "\tpublic void set" + attribute.substring(0, 1).toUpperCase() + attribute.substring(1) + "(" + type + " " + attribute + "){\n" +
                "\t\tthis." + attribute + " = " + attribute + ";\n" +
                "\t}\n";
    }
}
