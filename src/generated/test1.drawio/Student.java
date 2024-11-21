import User;

public class Student extends User {
	 String matricule;

	public Student() {
		// Default constructor
	}

	public Student(String matricule, ) {
		this.matricule = matricule;
	}

	public boolean login(String name) {
		// TODO: implement method
	}
		public String getMatricule(){
		return this.matricule;
	}
		public void setMatricule(String matricule){
		this.matricule = matricule;
	}

}
