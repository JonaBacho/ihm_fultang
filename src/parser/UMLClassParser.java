package parser;

import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import models.UMLAttribute;
import models.UMLClass;
import models.UMLMethod;
import models.UMLRelation;
import models.UMLRelationWithCardinality;

public class UMLClassParser {
    private final NodeList mxCells;

    public UMLClassParser(NodeList mxCells) {
        this.mxCells = mxCells;
    }

    public List<UMLClass> parseClasses() {
        List<UMLClass> classes = new ArrayList<>();

        for (int i = 0; i < mxCells.getLength(); i++) {
            Element cell = (Element) mxCells.item(i);

            if (isUMLClass(cell)) {
                classes.add(parseUMLClass(cell));
            }
        }
        for (int i = 0; i < mxCells.getLength(); i++){
            Element cell = (Element) mxCells.item(i); 
            if (isExtendsRelation(cell)) {
                parseRelation(classes, cell, "Extends");
            } else if (isAggregationRelation(cell)) {
                parseRelation(classes, cell, "Aggregation");
            } else if (isCompositionRelation(cell)){
                parseRelation(classes, cell, "Composition");
            } else if (isRelationWithCardinality(cell)){
                parseRelationWithCardinality(classes, cell);
            }
        }
        return classes;
    }

    private UMLClass parseUMLClass(Element cell) {
        UMLClass umlClass = new UMLClass();
        umlClass.setClassName(cell.getAttribute("value"));
        String classId = cell.getAttribute("id");
        umlClass.setId(classId);

        List<UMLAttribute> attributes = new ArrayList<>();
        List<UMLMethod> methods = new ArrayList<>();

        for (int j = 0; j < mxCells.getLength(); j++) {
            Element child = (Element) mxCells.item(j);
            if (child.getAttribute("parent").equals(classId)) {
                if (isUMLAttribute(child)) {
                    attributes.add(parseAttribute(child));
                } else if (isUMLMethod(child)) {
                    methods.add(parseMethod(child));
                }
            }
        }

        umlClass.setAttributes(attributes);
        umlClass.setMethods(methods);
        return umlClass;
    }

    private UMLAttribute parseAttribute(Element cell) {
        return new UMLAttribute(cell.getAttribute("value"));
    }

    private UMLMethod parseMethod(Element cell) {
        return new UMLMethod(cell.getAttribute("value"));
    }

    private void parseRelation(List<UMLClass> classes, Element cell, String relationType) {
        UMLRelation relation = new UMLRelation();
        relation.setType(relationType);
        String targetId = cell.getAttribute("target");
        String sourceId = cell.getAttribute("source");

        Optional<UMLClass> targetClass = classes.stream().filter(c -> c.getId().equals(targetId)).findFirst();
        Optional<UMLClass> sourceClass = classes.stream().filter(c -> c.getId().equals(sourceId)).findFirst();

        if (targetClass.isPresent() && sourceClass.isPresent()) {
            relation.setTarget(targetClass.get().getClassName());
            sourceClass.get().getRelations().add(relation);
        }
    }

    private void parseRelationWithCardinality(List<UMLClass> classes, Element cell) {
        UMLRelationWithCardinality relation = new UMLRelationWithCardinality();
    
        // Source et cible
        String targetId = cell.getAttribute("target");
        String sourceId = cell.getAttribute("source");
    
        Optional<UMLClass> targetClass = classes.stream().filter(c -> c.getId().equals(targetId)).findFirst();
        Optional<UMLClass> sourceClass = classes.stream().filter(c -> c.getId().equals(sourceId)).findFirst();
    
        String relationName = cell.getAttribute("value");
    
        String sourceCardinality = null;
        String targetCardinality = null;
    
        for (int i = 0; i < mxCells.getLength(); i++) {
            Element potentialChild = (Element) mxCells.item(i);
    
            if (potentialChild.getAttribute("parent").equals(cell.getAttribute("id"))
                    && isCardinality(potentialChild.getAttribute("value"))) {
    
                String x = potentialChild.getAttribute("x"); // Exemple hypothétique
                if ("1".equals(x)) { // `x=1` : cible
                    targetCardinality = potentialChild.getAttribute("value");
                } else if ("-1".equals(x)) { // `x=-1` : source
                    sourceCardinality = potentialChild.getAttribute("value");
                }
            }
        }
    
        if (sourceClass.isPresent() && targetClass.isPresent()) {
            relation.setType("AssociationWithCardinality");
            relation.setRelationName(relationName);
            relation.setTarget(targetClass.get().getClassName());
            relation.setSourceCardinality(sourceCardinality);
            relation.setTargetCardinality(targetCardinality);
    
            sourceClass.get().getRelations().add(relation);
        }
    }
    

    private boolean isUMLClass(Element cell) {
        return cell.getAttribute("style").contains("swimlane");
    }

    private boolean isUMLAttribute(Element cell) {
        String style = cell.getAttribute("style");
        String value = cell.getAttribute("value");
        return style.contains("text") && value.contains(":") && !value.contains("(");
    }

    private boolean isUMLMethod(Element cell) {
        String style = cell.getAttribute("style");
        String value = cell.getAttribute("value");
        return style.contains("text") && value.contains("(");
    }

    private boolean isExtendsRelation(Element cell) {
        return cell.getAttribute("style").contains("endArrow=block");
    }

    private boolean isAggregationRelation(Element cell) {
        String style = cell.getAttribute("style");
        return style.contains("endArrow=diamondThin") && style.contains("endFill=0");
    }

    private boolean isCompositionRelation(Element cell) {
        String style = cell.getAttribute("style");
        return style.contains("endArrow=diamondThin") && style.contains("endFill=0");
    }

    private boolean isRelationWithCardinality(Element cell) {
        return cell.getAttribute("style").contains("endArrow=none");
    }
    
    private boolean isCardinality(String value) {
        // Une cardinalité typique : "0..n", "1", "1..*", "*", etc.
        return value.matches("\\d+|\\d+\\.\\.\\d+|\\d+\\.\\.\\*|\\*");
    }
    
}