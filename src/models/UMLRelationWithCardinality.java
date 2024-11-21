package models;

public class UMLRelationWithCardinality extends UMLRelation{

    String sourceCardinality;
    String targetCardinality;
    String relationName;
    public String getRelationName() {
        return relationName;
    }
    public void setRelationName(String relationName) {
        this.relationName = relationName;
    }
    public String getSourceCardinality() {
        return sourceCardinality;
    }
    public void setSourceCardinality(String sourceCardinality) {
        this.sourceCardinality = sourceCardinality;
    }
    public String getTargetCardinality() {
        return targetCardinality;
    }
    public void setTargetCardinality(String targetCardinality) {
        this.targetCardinality = targetCardinality;
    }



}
