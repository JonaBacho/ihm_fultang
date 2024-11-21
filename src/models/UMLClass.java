package models;

import java.util.ArrayList;
import java.util.List;

public class UMLClass {
    
    private String id;
    private String className;
    private List<UMLAttribute> attributes;
    private List<UMLMethod> methods;
    private List<UMLRelation> relations = new ArrayList<UMLRelation>();


    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public List<UMLRelation> getRelations() {
        return relations;
    }
    public void setRelations(List<UMLRelation> relations) {
        this.relations = relations;
    }
    public String getClassName() {
        return className;
    }
    public void setClassName(String className) {
        this.className = className;
    }
    public List<UMLAttribute> getAttributes() {
        return attributes;
    }
    public void setAttributes(List<UMLAttribute> attributes) {
        this.attributes = attributes;
    }
    public List<UMLMethod> getMethods() {
        return methods;
    }
    public void setMethods(List<UMLMethod> methods) {
        this.methods = methods;
    }
}
