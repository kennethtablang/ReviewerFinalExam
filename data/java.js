// IT1908 — Advanced Java Programming (Object-Oriented Programming)
// Question format: { q, code?, c: [A, B, C, D], a: "A" | "B" | "C" | "D", e }

const prelim = {
  id: "prelim",
  label: "Prelims",
  topics: "Methods, static members, access modifiers, overloading",
  notes: [
    {
      h: "Parts of a method declaration",
      points: [
        "Access modifier is optional. Without one, the method is package-private.",
        "Optional specifiers come next: `static`, `final`, `abstract`.",
        "Return type is required. Use `void` when the method returns nothing.",
        "Method name, then the parameter list in parentheses (the parentheses are required even when empty).",
        "Method body in curly braces is required, except for `abstract` methods, which end with `;` and have no body.",
        "Order matters: modifiers come before the return type. `final static void m() { }` is valid, `void final m() { }` is not.",
      ],
      code: `public static int compute(int a, int b) {
    return a + b;
}`,
    },
    {
      h: "Signature, parameters and arguments",
      points: [
        "Method signature = the method's name + its parameter types. The return type is not part of the signature.",
        "Parameters are the variables listed in the method declaration: `compute(int a, int b)`.",
        "Arguments are the actual values passed in the call: `compute(5, 10)`.",
        "In `student.report(course)`, `report` is the method name, `student` is the object reference and `course` is the argument.",
      ],
    },
    {
      h: "Return rules",
      points: [
        "A non-void method must return a value of a compatible type. Missing `return` is a compilation error.",
        "`public int m() { return 0; }` compiles. `return 9.0;` (double into int), `return null;` (null into int) and a bare `return;` do not.",
        "A `void` method cannot return a value.",
      ],
    },
    {
      h: "Access modifiers (most to least restrictive)",
      table: {
        head: ["Modifier", "Who can access"],
        rows: [
          ["private", "Only members of its own class"],
          ["package-private (no keyword)", "Classes in the same package"],
          ["protected", "Same package + subclasses"],
          ["public", "Any class"],
        ],
      },
      points: [
        "Calling a `private` method from another class does not compile.",
        "`Public` with a capital P is not a keyword. Java is case-sensitive.",
      ],
    },
    {
      h: "static members",
      points: [
        "A static method belongs to the class, not to an object. Call it with the class name: `MathTools.calculate();`",
        "A static (class) variable is shared by every object. Changing it through one reference changes it for all.",
        "A static method can access other static methods and static variables, but it cannot directly access instance variables or instance methods.",
        "An instance method can access both static and instance members.",
        "`final static int x = 10;` declares a constant field.",
      ],
      code: `public class Apple {
    static String color = "red";
    public static void main(String[] args) {
        Apple apple = new Apple();
        apple.color = "green";          // changes the shared variable
        System.out.println(apple.color); // green
    }
}`,
    },
    {
      h: "final, abstract, void",
      points: [
        "`final` method: cannot be overridden by a subclass.",
        "`abstract` method: has no body.",
        "`void`: the method returns no value.",
        "Default values of fields: object references are `null`, numbers are `0`, booleans are `false`.",
      ],
    },
    {
      h: "Overloading and autoboxing",
      points: [
        "Overloading: same method name, different parameter list (number, type or order of parameters).",
        "Changing only the return type is not overloading. It is a compilation error, because the signature is the same.",
        "Two methods with the same name and parameters where one is static and the other is not also fail to compile.",
        "Autoboxing: a primitive is automatically converted to its wrapper class (`int` to `Integer`).",
        "Java picks the most specific overload: exact match first, then widening, then autoboxing, then varargs. So `add(10, 20)` picks `add(int, int)` over `add(Integer, Integer)`, and `m('5')` picks `m(char)` over `m(int)`.",
      ],
    },
  ],
  questions: [
    { q: "This method belongs to the class rather than the object of a class.", c: ["Abstract Method", "Final Method", "Static Method", "Void Method"], a: "C", e: "Static methods belong to the class itself and are called with the class name." },
    { q: "This keyword is used when a method is NOT allowed to be overridden by a subclass.", c: ["abstract", "final", "static", "void"], a: "B", e: "A final method cannot be overridden." },
    { q: "This keyword is used when a method DOES NOT have a body.", c: ["abstract", "final", "static", "void"], a: "A", e: "Abstract methods have no body; the declaration ends with a semicolon." },
    { q: "Which of the following is optional in a method declaration?", c: ["Access modifier", "A pair of curly brackets", "Method name", "Return type"], a: "A", e: "Leaving out the access modifier makes the method package-private. Name, return type and body are required." },
    { q: "This occurs when a primitive type is instantly converted to its object wrapper class.", c: ["Autoboxing", "Casting", "Overloading", "Overriding"], a: "A", e: "Autoboxing converts a primitive (e.g. int) to its wrapper (Integer) automatically." },
    { q: "Which of the following keywords indicates that the method will NOT return a value?", c: ["abstract", "final", "static", "void"], a: "D", e: "void means the method returns nothing." },
    { q: "What occurs when a method has the same name with another method but has different parameter types?", c: ["Autoboxing", "Casting", "Overloading", "Overriding"], a: "C", e: "Same name + different parameter list = overloading." },
    { q: "What is the other name for a class variable?", c: ["Abstract Variable", "Final Variable", "Static Variable", "Void Variable"], a: "C", e: "Class variables are declared static and shared by all objects." },
    { q: "Which access modifier is the most restrictive?", c: ["package-private", "private", "protected", "public"], a: "B", e: "private limits access to the class itself." },
    { q: "It consists of the method's name and parameter types.", c: ["Object", "Return Type", "Signature", "Variable"], a: "C", e: "The method signature is the name plus the parameter types." },
    { q: "Which modifier allows access to the subclasses of the class?", c: ["package-private", "private", "protected", "static"], a: "C", e: "protected grants access to the same package and to subclasses." },
    { q: "Which of the following statements is NOT TRUE?", c: ["A static method can access another static method.", "A static method can access a static variable.", "A static method can access an instance method.", "An instance method can access a static method."], a: "C", e: "A static method has no object (no this), so it cannot directly call instance methods." },
    { q: "These are the variables listed in a method declaration.", c: ["Objects", "Parameters", "Return Types", "Signatures"], a: "B", e: "Parameters are declared in the method header; arguments are the values passed in." },
    { q: "Which modifier grants access only to members of its own class?", c: ["package-private", "private", "protected", "public"], a: "B", e: "private = own class only." },
    { q: "Which of the following access modifiers is the least restrictive?", c: ["package-private", "private", "protected", "public"], a: "D", e: "public members can be accessed from anywhere." },
    {
      q: "What is the output of the code below?",
      code: `public class Test {
    private static void add(int i, int j) {
        System.out.println("int ");
    }
    private static void add(Integer i, Integer j) {
        System.out.println("Integer ");
    }
    public static void main(String[] args) {
        add(10, 20);
    }
}`,
      c: ["30", "null", "int", "Integer"], a: "C", e: "10 and 20 are int literals. An exact match (int, int) beats autoboxing to Integer.",
    },
    {
      q: "Which line leads to compilation error?",
      code: `public class Prelim {
    int count;
    public static void displayMsg() {
        System.out.println(count);
    }
    public static void main(String[] args) {
        Prelim.displayMsg();
    }
}`,
      c: ["public static void displayMsg(){", "System.out.println(count);", "Prelim.displayMsg();", "public class Prelim {"], a: "B", e: "count is an instance variable; a static method cannot reference it directly.",
    },
    { q: "Which of the following will compile successfully?", c: ["public void methodA() { return null; }", "public int methodB() { return 9.0; }", "public int methodC() { return; }", "public int methodC() { return 0; }"], a: "D", e: "Only D returns a value that matches the int return type." },
    {
      q: "What is the output of the code below?",
      code: `public class Test {
    static void m(int x) {
        System.out.println("int");
    }
    static void m(char x) {
        System.out.println("char");
    }
    public static void main(String[] args) {
        int i = 5;
        m('5');
    }
}`,
      c: ["0", "5", "char", "int"], a: "C", e: "'5' is a char literal, so the exact match m(char) is chosen.",
    },
    { q: "Which of the following can fit the missing statement?", code: `public class Prelim {
    ____ void method() { }
}`, c: ["int", "final", "Public", "String"], a: "B", e: "Only a modifier fits before void. Public (capital P) is not a keyword; int and String are return types, which would clash with void." },
    { q: "What is true in the following statement?", code: `student.report(course);`, c: ["report is the method name.", "student is the class name.", "course inherits from student.", "student is a String variable."], a: "A", e: "The identifier before the parentheses is the method; student is the object reference and course is the argument." },
    { q: "Which of the following is a valid method declaration in Java?", c: ["public int compute(int a, int b) { return a + b; }", "void display(String name)", "function calculate(int x, int y): int", "private method greet(String message)"], a: "A", e: "B has no body, C is not Java syntax, D uses 'method' as if it were a keyword." },
    { q: "Which of the following method declarations is correct?", c: ["boolean isCorrect() { return true; }", "public boolean isCorrect() { return 0; }", "boolean isCorrect() { return null; }", "boolean private isCorrect() { return null; }"], a: "A", e: "true matches boolean. 0 and null are not booleans, and modifiers must come before the return type." },
    { q: "Which of the following correctly overloads the following method declaration?", code: `public void check() { }`, c: ["public static void check() { }", "public static void check(boolean answer) { }", "public static void checkItems() { }", "public final void checkItems() { }"], a: "B", e: "Overloading needs the same name with a different parameter list. A has the same signature; C and D are different names." },
    {
      q: "What is the result of the code below?",
      code: `public class Test {
    public String name;
    public static void main(String[] args) {
        Test obj = new Test();
        System.out.println(obj.name);
    }
}`,
      c: ["0", "null", "Test", "Compilation error"], a: "B", e: "Uninitialized object fields (String) default to null.",
    },
    { q: "What will be the result if a method with a non-void return type does not include a return statement?", c: ["The method will return null automatically.", "The program will compile but crash at runtime.", "The method will execute and return nothing.", "The program will result in a compilation error."], a: "D", e: "The compiler reports 'missing return statement'." },
    {
      q: "Why will the code below NOT compile?",
      code: `class Caller {
    private void start() {
        System.out.print("Started");
    }
}
public class Test {
    public static void main(String[] args) {
        Caller c = new Caller();
        c.start();
    }
}`,
      c: ["The start() method is private.", "The Caller class is NOT public.", "The start() method DOES NOT return a value.", "The class used print() instead of println()."], a: "A", e: "private methods are only accessible inside Caller.",
    },
    { q: "Which of the following statements declares a constant field?", c: ["int x = 10;", "const int x = 10;", "public int x = 10;", "final static int x = 10;"], a: "D", e: "final makes it unchangeable and static makes it a class-level constant. const is reserved but unused in Java." },
    { q: "Which of the following will compile successfully?", c: ["final static void methodA() { }", "public final int void methodB() { }", "private void int methodC() { }", "void final methodD() { }"], a: "A", e: "Modifiers (final static) precede a single return type. B and C have two return types; D puts final after the return type." },
    {
      q: "What is the output of the code below?",
      code: `public class Apple {
    static String color = "red";
    public static void main(String[] args) {
        Apple apple = new Apple();
        apple.color = "green";
        System.out.println(apple.color);
    }
}`,
      c: ["0", "null", "green", "red"], a: "C", e: "The static variable is reassigned to \"green\" before printing.",
    },
    { q: "What is the correct way to define a method that returns a String and takes a double and a String as arguments?", c: ["String method(double x, String y) { }", "method String(double x, String y) { }", "String method(x double, y String) { }", "String method = (double x, String y) { }"], a: "A", e: "Return type, name, then (type name, type name)." },
    { q: "Which of the following scenarios will result in a compilation error when declaring methods in the same class?", c: ["Two methods with the same name but different parameter types.", "One method is static and the other is non-static but both have the same name and parameters.", "Two methods with the same name, same parameter list, but different return types.", "One method is public and another is private but both have different parameter lists."], a: "C", e: "The return type is not part of the signature, so these two methods clash. (B also fails to compile in real Java, but C is the expected exam answer.)" },
    { q: "What is the correct way to call a static method named calculate() defined in the MathTools class?", c: ["calculate.MathTools();", "MathTools.calculate();", "new MathTools().calculate();", "static MathTools.calculate();"], a: "B", e: "Static methods are called with ClassName.methodName()." },
    { q: "In the method call calculateTotal(5, 10), what are 5 and 10 referred to as?", c: ["Variables", "Parameters", "Return types", "Arguments"], a: "D", e: "Values passed in a call are arguments." },
    { q: "What is true about instance methods?", c: ["They must always be declared as static.", "They can be accessed without creating an object.", "They can access both static and instance variables.", "They cannot have parameters."], a: "C", e: "Instance methods run on an object, so they can use instance and static members." },
  ],
};

const midterm = {
  id: "midterm",
  label: "Midterms",
  topics: "Encapsulation, constructors, inheritance",
  notes: [
    {
      h: "Encapsulation",
      points: [
        "Encapsulation is the ability of an object to hide its data and methods.",
        "Declare instance variables `private` and expose them through `public` getters and setters.",
        "Accessor (getter): a public method that returns data from a private variable. It needs the `return` keyword. Name starts with `get`, or `is` for booleans.",
        "Mutator (setter): a public method that changes a private variable. Name starts with `set` and the return type is `void`.",
      ],
      code: `public class Student {
    private String course;                    // hidden data
    public String getCourse() { return course; }        // accessor
    public void setCourse(String course) {              // mutator
        this.course = course;                 // this = instance variable
    }
}`,
    },
    {
      h: "Constructors",
      points: [
        "A constructor has the same name as the class and no return type: `public Exam() { }`.",
        "Objects are created with `new`: `Exam e = new Exam();`",
        "If you write no constructor, Java provides a default no-argument constructor.",
        "Constructor overloading: the number and type of arguments passed to `new` decide which constructor runs.",
        "Constructor chaining: calling another constructor in the same class with `this(...)`.",
        "Use `this(name)` to call another constructor. `Exam(name);` is an error.",
        "A constructor can set default values, e.g. `public Employee() { salary = 15000; }` makes every new Employee start at 15000.",
      ],
    },
    {
      h: "Rules in defining constructors",
      points: [
        "The first statement of every constructor is a call to another constructor, either `this(...)` or `super(...)`.",
        "`super()` may only be used as the first statement. `this(...)` must also be first, so `setSalary(salary); this(name, age);` is an error.",
        "If no `super()` call is written, Java inserts a no-argument `super()` as the first statement. Even `public Student() { }` gets one.",
        "If the parent has no no-argument constructor, every child constructor must explicitly call a parent constructor.",
      ],
    },
    {
      h: "Inheritance",
      points: [
        "Inheritance lets a class acquire the attributes and behaviors of another class and avoids repeating code.",
        "Keyword: `extends`. Write the child first: `class Zyx extends Cba { }` means Zyx is the subclass and Cba is the superclass.",
        "Superclass = parent = base class. Subclass = child = derived class.",
        "Java allows single inheritance: a class can extend only one class.",
        "Constructors are not inherited.",
        "Every class implicitly extends `java.lang.Object`. `public class Student { }` is the same as `public class Student extends java.lang.Object { }`.",
        "`final` on a class prevents it from being extended.",
        "`super` calls the parent constructor or method. `this` refers to the current object. `new` instantiates.",
        "Different classes can implement the same interface.",
      ],
    },
    {
      h: "Constructor order and overriding",
      points: [
        "When a subclass object is created, the parent constructor runs first, then the child's.",
        "To override, declare a method in the subclass with the same name, parameter list and return type as the parent's method.",
      ],
      code: `class Person    { Person()  { System.out.println("Person"); } }
class Student extends Person { Student() { System.out.println("Student"); } }
class FirstYear extends Student { }
// new FirstYear();  prints:
// Person
// Student`,
    },
  ],
  questions: [
    { q: "This is a public method that returns data from a private instance variable.", c: ["Accessor", "Constructor", "Mutator", "Variable"], a: "A", e: "Accessors (getters) return private data." },
    { q: "Which of the following keywords implies inheritance?", c: ["extends", "new", "super", "this"], a: "A", e: "class Child extends Parent." },
    { q: "When a constructor calls another constructor with a greater number of parameters, what is it called?", c: ["Constructor Calling", "Constructor Chaining", "Constructor Overloading", "Constructor Overriding"], a: "B", e: "Calling another constructor through this(...) is constructor chaining." },
    { q: "How many classes can a class inherit from?", c: ["1", "2", "3", "4"], a: "A", e: "Java supports single class inheritance only." },
    { q: "This public method changes the data stored in private instance variables.", c: ["Accessor", "Constructor", "Mutator", "Variable"], a: "C", e: "Mutators (setters) change private data." },
    { q: "What do you call a class that is derived from another class?", c: ["Ancestor Class", "Base Class", "Parent Class", "Subclass"], a: "D", e: "A derived class is a subclass (child class)." },
    { q: "It allows a class to acquire all the attributes and behaviors of another class.", c: ["Abstraction", "Encapsulation", "Inheritance", "Polymorphism"], a: "C", e: "Inheritance passes attributes and behaviors from parent to child." },
    { q: "This is the class from which the subclass is derived.", c: ["Base Class", "Child Class", "Derived Class", "Descendant Class"], a: "A", e: "The base class is the superclass (parent)." },
    { q: "To prevent a class from being extended, which access modifier should you use?", c: ["abstract", "final", "protected", "public"], a: "B", e: "A final class cannot be subclassed." },
    { q: "It describes the ability of an object to hide its data and methods.", c: ["Interface", "Encapsulation", "Inheritance", "Polymorphism"], a: "B", e: "Encapsulation = data hiding." },
    { q: "Which of the following keywords is used to call the constructor in the parent class?", c: ["extends", "new", "super", "this"], a: "C", e: "super(...) invokes the parent constructor." },
    { q: "Which keyword is used to instantiate an object?", c: ["extends", "new", "super", "this"], a: "B", e: "new creates an object." },
    { q: "Which keyword is used to refer to an instance variable?", c: ["extends", "new", "super", "this"], a: "D", e: "this.name refers to the current object's instance variable." },
    { q: "What is the parent class of all Java classes?", c: ["Collection", "List", "Object", "Set"], a: "C", e: "Every class ultimately extends java.lang.Object." },
    { q: "What is the access modifier to use for the instance variables in a program that applies encapsulation?", c: ["package-private", "private", "protected", "public"], a: "B", e: "Encapsulated fields are private." },
    { q: "The superclass is Cba while the derived class is Zyx. How should you write the class declaration?", c: ["class Cba extends Zyx { }", "class Zyx extends Cba { }", "class Cba implements Zyx { }", "class Zyx implements Cba { }"], a: "B", e: "The child extends the parent: Zyx extends Cba." },
    { q: "Which is TRUE in the following statements?", c: ["The constructor of the superclass is inherited by the subclass.", "Different classes can implement the same interface.", "In the code fragment, public class Leona extends Lucian, the base class is Leona while the subclass is Lucian.", "In the class declaration, public class Aatrox extends Alistar, the superclass is Aatrox while the child class is Alistar."], a: "B", e: "Constructors are not inherited, and in C and D the roles are reversed." },
    { q: "What is the constructor of the class named Exam?", c: ["Exam()", "main", "public", "void"], a: "A", e: "A constructor has the same name as the class." },
    { q: "Which of the following is NOT a rule in defining constructors?", c: ["The super() command may only be used as the first statement of the constructor.", "If a super() call is not declared in a constructor, Java will insert a no-argument super() as the first statement of the constructor.", "The first statement of every constructor is a call to another constructor within the class using the new keyword.", "If the parent class does not have a no-argument constructor, the compiler requires an explicit call to a parent constructor in each child constructor."], a: "C", e: "Constructors call other constructors in the same class with this, not new." },
    { q: "What is missing in the following method declaration?", code: `public _______ setScore(int score) { }`, c: ["class", "new", "return", "void"], a: "D", e: "Setters return nothing, so the return type is void." },
    { q: "What is missing in the following method declaration?", code: `public String getCourse() { _______ course; }`, c: ["class", "new", "return", "void"], a: "C", e: "Accessors must return the value." },
    { q: "How can you override a method?", c: ["Declare a new method with the same name, parameter list, and return type as the method in the parent class.", "Declare a new method with the same name, parameter list, and return type as the method in the subclass.", "Declare a new method with the same name and return type as the method in the parent class, but with a different parameter list.", "Declare a new method with the same name and return type as the method in the subclass, but with a different parameter list."], a: "A", e: "Overriding matches the parent method's name, parameters and return type. A different parameter list would be overloading." },
    { q: "Which of the following statements is NOT TRUE?", c: ["Names of accessors begin with get if the property is not a boolean.", "Names of mutators begin with set.", "Instance variables are declared public.", "Accessors require the return keyword."], a: "C", e: "Under encapsulation, instance variables are private." },
    { q: "Which rule in defining constructors is applied on the following constructor?", code: `public Student() { }`, c: ["The super() command may only be used as the first statement of the constructor.", "If a super() call is not declared in a constructor, Java will insert a no-argument super() as the first statement of the constructor.", "The first statement of every constructor is a call to another constructor within the class using the this keyword.", "If the parent class does not have a no-argument constructor, the compiler requires an explicit call to a parent constructor in each child constructor."], a: "B", e: "The body is empty, so Java inserts super() automatically." },
    { q: "To avoid repetition of programming instructions for multiple classes, what should you implement?", c: ["Inheritance", "Information Hiding", "Overloading", "Polymorphism"], a: "A", e: "Common code goes in a parent class that others extend." },
    { q: "What is missing in the following method declaration?", code: `public _______ setCourse(String course) { }`, c: ["class", "new", "return", "void"], a: "D", e: "Mutators use void." },
    {
      q: "Which causes the error in the constructor below?",
      code: `public Employee(String name, int age, int salary) {
    setSalary(salary);
    this(name, age);
}`,
      c: ["public Employee", "String name, int age, int salary", "setSalary(salary);", "this(name, age);"], a: "D", e: "this(...) must be the first statement in a constructor.",
    },
    { q: "The subclass is Abc while the parent class is Xyz. How should you write the class declaration?", c: ["class Abc extends Xyz { }", "class Xyz extends Abc { }", "class Abc implements Xyz { }", "class Xyz implements Abc { }"], a: "A", e: "Subclass extends parent: Abc extends Xyz." },
    { q: "Which of the following is a valid statement?", c: ["Exam e = new Exam();", "Exam e = new exam();", "exam e = new Exam();", "Exam e = new Exam;"], a: "A", e: "Class names are case-sensitive and the constructor call needs parentheses." },
    {
      q: "Which causes the error in the constructor below?",
      code: `public Exam(String name, int age) {
    Exam(name);
    setAge(age);
}`,
      c: ["public Exam", "String name, int age", "Exam(name);", "setAge(age);"], a: "C", e: "To call another constructor, write this(name), not Exam(name).",
    },
    { q: "What is the effect of the following constructor?", code: `public Employee() { salary = 15000; }`, c: ["It prevents the Employee object from being instantiated.", "It ensures that every Employee object starts with a salary of 15000.", "It overrides the default constructor provided by Java.", "It calls another constructor in the Employee class."], a: "B", e: "The no-arg constructor initializes salary for every new object." },
    { q: "Which of the following best enforces encapsulation in Java?", c: ["Declaring instance variables as private and providing public getter and setter methods.", "Declaring instance variables as public and restricting setter methods.", "Using only constructors for initialization without accessors.", "Declaring all variables and methods as protected."], a: "A", e: "Private fields + public accessors/mutators is the standard pattern." },
    { q: "Which of the following class declarations is implicitly equivalent to public class Student { }?", c: ["public class Student implements Object { }", "public class Student extends Class { }", "public class Student extends java.lang.Object { }", "public class Student extends Person { }"], a: "C", e: "Every class without extends implicitly extends java.lang.Object." },
    { q: "In constructor overloading, what determines which constructor is invoked?", c: ["The return type declared by the constructor.", "The visibility modifiers applied to the constructors.", "The type and number of arguments passed during object creation.", "The order in which constructors are defined in the class."], a: "C", e: "Java matches the arguments in new Exam(...) to a constructor's parameters." },
    {
      q: "What will be the program output?",
      code: `public class Person {
    public Person() { System.out.println("Person"); }
}
public class Student extends Person {
    public Student() { System.out.println("Student"); }
}
public class FirstYear extends Student {
    public static void main(String[] args) {
        FirstYear fy = new FirstYear();
    }
}`,
      c: ["Compilation error", "FirstYear", "Student\nPerson", "Person\nStudent"], a: "D", e: "FirstYear's default constructor calls super() → Student() → Person(). The parent constructor finishes first.",
    },
  ],
};

const prefinal = {
  id: "prefinal",
  label: "Prefinals",
  topics: "Abstract classes, concrete classes, interfaces",
  notes: [
    {
      h: "Abstract classes",
      points: [
        "An abstract class exists so that subclasses are forced to implement necessary methods.",
        "It can never be instantiated with `new`.",
        "It can contain both abstract and non-abstract (concrete) methods.",
        "It cannot be `final`: `final abstract class Test` does not compile.",
        "An abstract method has no body, contains zero statements and ends with `;`: `abstract void doIt();`",
        "Abstract methods can only appear in abstract classes. Putting one in a concrete class is a compilation error.",
      ],
    },
    {
      h: "Concrete classes",
      points: [
        "A concrete class is a non-abstract class that extends an abstract class.",
        "The first concrete class must implement every inherited abstract method. An abstract subclass does not have to.",
        "Overriding cannot reduce visibility. If the parent's method is `protected`, the child's version must be `protected` or `public`.",
      ],
      code: `abstract class Animal { public abstract void sleep(); }
abstract class Pet extends Animal { public abstract void eat(); }
class Cat extends Pet { }   // error: Cat must implement sleep() AND eat()`,
    },
    {
      h: "Interface definition rules",
      points: [
        "An interface is a collection of related abstract public methods, declared with the `interface` keyword.",
        "An interface cannot be instantiated directly: `new Readable()` is an error.",
        "An interface is not required to have any methods, and it can have as many as you need.",
        "An interface cannot be marked `final`. Interfaces are assumed to be abstract.",
        "All abstract, default and static methods in an interface are implicitly `public`. `int getBookmark();` is the same as `public abstract int getBookmark();`.",
        "Interface variables are implicitly `public static final` (constants). They are never `protected`.",
        "A class uses `implements` and can implement as many interfaces as it needs.",
      ],
    },
    {
      h: "Interface inheritance and implementation rules",
      points: [
        "A class cannot extend an interface: `class Book extends Readable` is an error.",
        "An interface cannot extend a class: `interface Readable extends Book` is an error.",
        "An interface cannot implement another interface. It uses `extends` instead.",
        "A class can implement interfaces whose methods overload each other, e.g. `getBookmark()` and `getBookmark(int page)`.",
        "If two interfaces declare the identical method, the class implements it once.",
        "A class cannot implement two interfaces whose methods have the same signature but different return types (`int getNumGlasses()` vs `void getNumGlasses()`).",
      ],
      code: `interface Drinkable { int getNumGlasses(); }
interface Potable   { int getNumGlasses(); }
class Water implements Drinkable, Potable {
    public int getNumGlasses() { return 8; }  // one body satisfies both
}`,
    },
    {
      h: "Counting required methods",
      points: [
        "If abstract `Book implements Readable` (with 2 methods), then Book itself is required to define 0 of them, because it is abstract.",
        "The concrete class that extends Book must define both, so it needs 2.",
      ],
    },
  ],
  questions: [
    { q: "Which symbol marks the end of an abstract method declaration?", c: [":", ";", "}", ")"], a: "B", e: "abstract void doIt(); ends with a semicolon because there is no body." },
    { q: "How many methods can be present in an interface?", c: ["None", "1", "2", "As many as possible"], a: "D", e: "There is no upper limit." },
    { q: "How many methods are required to be present in an interface?", c: ["None", "1", "2", "As many as possible"], a: "A", e: "An interface may be empty." },
    { q: "How many times can you instantiate an abstract class?", c: ["Never", "1", "2", "As frequent as possible"], a: "A", e: "Abstract classes cannot be instantiated." },
    { q: "What can an abstract class contain?", c: ["Only abstract methods", "Only non-abstract methods", "Both abstract and non-abstract methods", "Only abstract variables"], a: "C", e: "Abstract classes mix abstract and concrete methods." },
    { q: "How many interfaces can be implemented by a class?", c: ["None", "1", "2", "As many as possible"], a: "D", e: "A class can implement many interfaces." },
    { q: "Which of the following keywords implies the use of an interface?", c: ["extends", "implements", "switch", "throws"], a: "B", e: "class X implements Y." },
    { q: "It is a non-abstract class that extends an abstract class.", c: ["Concrete Class", "Public Class", "Private Class", "Static Class"], a: "A", e: "A concrete class provides implementations for the abstract methods." },
    { q: "This method is required to be implemented by subclasses.", c: ["Abstract Method", "Default Method", "Public Method", "Private Method"], a: "A", e: "Concrete subclasses must implement abstract methods." },
    { q: "It is a collection of related abstract public methods.", c: ["Class", "Directory", "Interface", "Package"], a: "C", e: "That is the definition of an interface." },
    { q: "Which of the following modifiers is NOT assumed for all interface variables?", c: ["final", "protected", "public", "static"], a: "B", e: "Interface variables are implicitly public static final." },
    { q: "Which of the following keywords is NOT used in creating an interface?", c: ["abstract", "final", "interface", "public"], a: "B", e: "An interface cannot be marked final." },
    { q: "This class is created to ensure that subclasses will implement necessary methods.", c: ["Abstract Class", "Public Class", "Private Class", "Static Class"], a: "A", e: "Abstract methods force subclasses to provide implementations." },
    { q: "This access modifier is implicitly applied to abstract methods.", c: ["default", "protected", "public", "static"], a: "C", e: "Abstract methods in interfaces are implicitly public." },
    { q: "How many statements are defined within an abstract method?", c: ["None", "1", "2", "As many as possible"], a: "A", e: "Abstract methods have no body." },
    {
      q: "Which line causes an error in the code below?",
      code: `final abstract class Test {
    protected static int i;
    void doStuff() { }
    abstract void doIt();
}`,
      c: ["final abstract class Test {", "protected static int i;", "void doStuff() { }", "abstract void doIt();"], a: "A", e: "A class cannot be both final (no subclasses) and abstract (needs subclasses).",
    },
    { q: "Which interface definition rule is implied in the following statement?", code: `Readable r = new Readable();`, c: ["An interface cannot be instantiated directly.", "It is not required for an interface to have a method.", "Interfaces are assumed to abstract.", "All abstract, default, and static methods in an interface are implicitly public."], a: "A", e: "new cannot be used on an interface." },
    {
      q: "How can you resolve the compilation error?",
      code: `abstract class Planet {
    protected void revolve() { }
    abstract void rotate();
}
class Earth extends Planet {
    void revolve() { }
    protected void rotate() { }
}`,
      c: ["Remove the abstract keyword from Planet's rotate() method.", "Make Planet's rotate() method public.", "Make Earth's revolve() method public.", "Make Earth's revolve() method private."], a: "C", e: "Earth's revolve() is package-private, which is weaker than the protected method it overrides. Making it public (or protected) fixes it.",
    },
    { q: "Which interface definition rule is implied in the following statement?", code: `Writable w = new Writable();`, c: ["An interface cannot be instantiated directly.", "It is not required for an interface to have a method.", "Interfaces are assumed to abstract.", "All abstract, default, and static methods in an interface are implicitly public."], a: "A", e: "Interfaces cannot be instantiated." },
    { q: "Which interface definition rule is implied in the following statement?", code: `public class Book implements Readable { }`, c: ["An interface may define constants.", "It is not required for an interface to have a method.", "Interfaces support multiple inheritance.", "All abstract, default, and static methods in an interface are implicitly public."], a: "B", e: "Book has an empty body yet compiles, so Readable must have no abstract methods." },
    {
      q: "Which interface inheritance/implementation rule is implied in the code below?",
      code: `public interface Readable {
    public int getBookmark();
}
public interface Writable {
    public int getBookmark(int page);
}`,
      c: ["A class cannot extend an interface.", "An interface cannot extend a class.", "An interface cannot implement another interface.", "A class can implement interfaces containing methods that overload."], a: "D", e: "getBookmark() and getBookmark(int) are overloads, so one class can implement both.",
    },
    { q: "Which interface definition rule is implied in the following statement?", code: `public class Paper implements Writable { }`, c: ["A class can implement multiple interfaces.", "It is not required for an interface to have a method.", "Interfaces can contain default and static methods.", "All abstract, default, and static methods in an interface are implicitly public."], a: "B", e: "An empty class body compiles only if the interface has no required methods." },
    { q: "Which interface inheritance/implementation rule is implied in the code below?", code: `public interface Readable { }
public class Book extends Readable { }`, c: ["A class cannot extend an interface.", "An interface cannot extend a class.", "An interface cannot implement another interface.", "A class can implement interfaces containing methods that overload."], a: "A", e: "Classes implement interfaces; they cannot extend them." },
    { q: "Given an abstract class named Book that is extended by a concrete class and implements the Readable interface, how many methods are required to be defined in that concrete class?", code: `interface Readable {
    public void readBook();
    public void setBookmark();
}`, c: ["None", "1", "2", "As many as possible"], a: "C", e: "The first concrete class must implement both inherited abstract methods." },
    {
      q: "Which interface inheritance/implementation rule is implied in the code below?",
      code: `public interface Readable {
    public int getBookmark();
}
public interface Writable {
    public void getBookmark();
}`,
      c: ["An interface cannot extend a class.", "An interface cannot implement another interface.", "A class can implement interfaces containing methods that overload.", "A class cannot implement interfaces that contain methods with the same signature but with different return types."], a: "D", e: "Same signature getBookmark() with int vs void return types cannot both be satisfied.",
    },
    { q: "Which interface inheritance/implementation rule is implied in the code below?", code: `public interface Readable { }
public interface Writable implements Readable { }`, c: ["A class cannot extend an interface.", "An interface cannot extend a class.", "An interface cannot implement another interface.", "A class can implement interfaces containing methods that overload."], a: "C", e: "Interfaces extend other interfaces; they never implement them." },
    {
      q: "Which interface definition rule is implied in the code below?",
      code: `// Interface 1
public interface Readable {
    int getBookmark();
}
// Interface 2
public abstract interface Readable {
    public abstract int getBookmark();
}`,
      c: ["An interface cannot be instantiated directly.", "It is not required for an interface to have a method.", "An interface cannot be marked as final.", "All abstract, default, and static methods in an interface are implicitly public."], a: "D", e: "The two are equivalent because the compiler adds public abstract to interface methods.",
    },
    { q: "Which interface inheritance/implementation rule is implied in the code below?", code: `public class Book { }
public interface Readable extends Book { }`, c: ["A class cannot extend an interface.", "An interface cannot extend a class.", "An interface cannot implement another interface.", "A class can implement interfaces containing methods that overload."], a: "B", e: "Interfaces can only extend other interfaces." },
    { q: "Given an abstract class named Book that is extended by a concrete class and implements the Readable interface, how many methods are required to be defined in the Book class?", code: `interface Readable {
    public void readBook();
    public void setBookmark();
}`, c: ["None", "1", "2", "As many as possible"], a: "A", e: "Book is abstract, so it can leave the interface methods to its concrete subclass." },
    { q: "Given an abstract class named Book that is extended by a concrete class, how many interfaces can be implemented by the Book class?", c: ["None", "1", "2", "As many as possible"], a: "D", e: "Any class, abstract or not, can implement multiple interfaces." },
    {
      q: "Why does this code fail to compile?",
      code: `public abstract class Animal {
    public abstract void sleep();
}
public abstract class Pet extends Animal {
    public abstract void eat();
}
public class Cat extends Pet { }`,
      c: ["Animal must be declared final.", "Cat must implement both sleep() and eat().", "Pet cannot extend another abstract class.", "Animal cannot contain abstract methods."], a: "B", e: "Cat is the first concrete class, so it must implement every inherited abstract method.",
    },
    {
      q: "Why will this code NOT compile?",
      code: `public interface Drinkable { int getNumGlasses(); }
public interface Potable { void getNumGlasses(); }
public class Water implements Drinkable, Potable { }`,
      c: ["Interfaces cannot share identical method names.", "Classes cannot implement multiple interfaces.", "The methods have the same name but different return types.", "Both interfaces are missing access modifiers."], a: "C", e: "int getNumGlasses() and void getNumGlasses() conflict.",
    },
    { q: "What happens when compiling this code?", code: `public interface Drinkable { }
public class Water extends Drinkable { }`, c: ["It compiles but produces a warning.", "It fails to compile because a class cannot extend an interface.", "It compiles successfully.", "The interface must be abstract."], a: "B", e: "Use implements, not extends, with an interface." },
    {
      q: "Why is this code valid?",
      code: `public interface Drinkable {
    int getNumGlasses();
}
public interface Potable {
    int getNumGlasses();
}
public class Water implements Drinkable, Potable {
    public int getNumGlasses() { return 8; }
}`,
      c: ["Identical methods across interfaces can be implemented once.", "Water overrides only one interface.", "Methods in interfaces cannot conflict.", "Both methods must have different return types."], a: "A", e: "One implementation satisfies both identical declarations.",
    },
    { q: "Why does this code fail to compile?", code: `public class Toy {
    public abstract void makeNoise();
}`, c: ["Abstract methods cannot appear in concrete classes.", "Abstract methods must always be static.", "Toy must extend another class.", "Abstract methods require a return type of void."], a: "A", e: "A class with an abstract method must itself be declared abstract." },
  ],
};

const finals = {
  id: "finals",
  label: "Final topics",
  isNew: true,
  topics: "Polymorphism, object casting, rules in overriding (Handout 09)",
  notes: [
    {
      h: "Polymorphism",
      points: [
        "Polymorphism allows performing a single action in different ways.",
        "Static polymorphism: the flow of control is decided at compile time. It is achieved through method overloading.",
        "Dynamic polymorphism: the flow of control is decided at runtime. It is achieved through method overriding.",
      ],
      code: `// Static: overloading
public void draw(String s) { }
public void draw(int i) { }
public void draw(int i, double f) { }

// Dynamic: overriding
public class Class1 {
    public String message() { return "Method"; }
}
public class Class2 extends Class1 {
    public String message() { return super.message() + " Overriding"; }
    public static void main(String[] args) {
        System.out.print(new Class2().message()); // Method Overriding
    }
}`,
    },
    {
      h: "Object casting",
      points: [
        "Casting changes the existing type of an object reference to another type.",
        "Upcasting: subclass to superclass. It is implicit, e.g. `Animal a = c;`",
        "Downcasting: superclass to subclass. It needs an explicit cast, e.g. `Cat c = (Cat) a;`",
      ],
      code: `Cat c = new Cat();
Animal a = c;          // upcasting

Animal a2 = new Cat();
Cat c2 = (Cat) a2;     // downcasting (works: a2 really is a Cat)`,
    },
    {
      h: "Rules in casting objects",
      points: [
        "Rule 1: the compiler will not allow casts to unrelated types. Casting Cat to Dog when there is no inheritance between them does not compile.",
        "Rule 2: even when the code compiles, an exception may be thrown at runtime if the object is not actually an instance of that class. `(Cat) new Animal()` throws ClassCastException.",
      ],
      code: `Cat c = new Cat();
Dog d = (Dog) c;       // does not compile: unrelated types

Animal a = new Animal();
Cat c2 = (Cat) a;      // compiles, but throws ClassCastException`,
    },
    {
      h: "Rules in overriding methods",
      points: [
        "Rule 1: the child method must have the same signature as the parent method.",
        "Rule 2: the child method must be at least as accessible as the parent method. A `protected` parent method cannot be overridden as `private`. Mark it `protected` or `public` instead.",
        "Rule 3: the child method may not throw a checked exception that is new, or broader than the exceptions thrown by the parent method.",
        "Example of rule 3: if the parent's `message()` throws nothing, the child cannot add `throws Exception`. If the parent throws `ArithmeticException`, the child cannot throw the broader `Exception`.",
      ],
      code: `public class ClassA {
    protected String message() { return "Method"; }
}
public class ClassB extends ClassA {
    private String message() { return " Overriding"; } // does not compile
}`,
    },
    {
      h: "Quick comparison",
      table: {
        head: ["", "Overloading", "Overriding"],
        rows: [
          ["Polymorphism type", "Static (compile time)", "Dynamic (runtime)"],
          ["Where", "Same class (or inherited)", "Subclass redefines parent method"],
          ["Parameter list", "Must differ", "Must be the same"],
          ["Access", "Any", "Same or more accessible"],
        ],
      },
      points: [],
    },
  ],
  questions: [
    { q: "It allows performing of a single action in different ways.", c: ["Encapsulation", "Abstraction", "Polymorphism", "Inheritance"], a: "C", e: "Polymorphism = many forms: one action, different behaviors." },
    { q: "In this type of polymorphism, the flow of control is decided during compile time.", c: ["Static", "Dynamic", "Runtime", "Abstract"], a: "A", e: "Static polymorphism is resolved at compile time." },
    { q: "In this type of polymorphism, the flow of control is decided during runtime.", c: ["Static", "Dynamic", "Compile-time", "Final"], a: "B", e: "Dynamic polymorphism is resolved at runtime." },
    { q: "Static polymorphism is achieved through which of the following?", c: ["Method overriding", "Method overloading", "Downcasting", "Inheritance"], a: "B", e: "Overloading is chosen at compile time from the argument types." },
    { q: "Dynamic polymorphism is achieved through which of the following?", c: ["Method overriding", "Method overloading", "Autoboxing", "Encapsulation"], a: "A", e: "Overriding is resolved at runtime from the actual object type." },
    { q: "It is casting from a subclass to a superclass.", c: ["Downcasting", "Upcasting", "Autoboxing", "Unboxing"], a: "B", e: "Up the hierarchy = upcasting." },
    { q: "It is casting from a superclass to a subclass.", c: ["Downcasting", "Upcasting", "Widening", "Overloading"], a: "A", e: "Down the hierarchy = downcasting." },
    { q: "It allows you to change the existing type of an object reference to another type.", c: ["Overloading", "Casting", "Instantiation", "Encapsulation"], a: "B", e: "Object casting changes the reference type." },
    {
      q: "Which type of polymorphism is shown in the code below?",
      code: `public void draw(String s) { }
public void draw(int i) { }
public void draw(int i, double f) { }`,
      c: ["Static polymorphism", "Dynamic polymorphism", "Upcasting", "Downcasting"], a: "A", e: "These are overloaded methods, so this is static (compile-time) polymorphism.",
    },
    {
      q: "What is the output of the code below?",
      code: `public class Class1 {
    public String message() { return "Method"; }
}
public class Class2 extends Class1 {
    public String message() {
        return super.message() + " Overriding";
    }
    public static void main(String[] args) {
        System.out.print(new Class2().message());
    }
}`,
      c: ["Method", " Overriding", "Method Overriding", "Compilation error"], a: "C", e: "super.message() returns \"Method\", then \" Overriding\" is appended.",
    },
    {
      q: "Which statement in the code below is an example of upcasting?",
      code: `public class Animal { }
public class Cat extends Animal {
    public static void main(String[] args) {
        Cat c = new Cat();
        Animal a = c;
    }
}`,
      c: ["public class Cat extends Animal", "Cat c = new Cat();", "Animal a = c;", "public static void main(String[] args)"], a: "C", e: "A Cat reference is assigned to an Animal (superclass) variable.",
    },
    {
      q: "Which statement in the code below is an example of downcasting?",
      code: `Animal a = new Cat();
Cat c = (Cat) a;`,
      c: ["Animal a = new Cat();", "Cat c = (Cat) a;", "Both statements", "Neither statement"], a: "B", e: "(Cat) a casts the superclass reference down to the subclass.",
    },
    {
      q: "What happens when the code below is compiled?",
      code: `public class Dog { }
public class Cat {
    public static void main(String[] args) {
        Cat c = new Cat();
        Dog d = (Dog) c;
    }
}`,
      c: ["It compiles and runs successfully.", "It does not compile because there is no inheritance between Cat and Dog.", "It compiles but throws ClassCastException at runtime.", "It compiles but prints null."], a: "B", e: "Rule 1: the compiler will not allow casts to unrelated types.",
    },
    {
      q: "What happens when the code below is executed?",
      code: `public class Animal { }
public class Cat extends Animal {
    public static void main(String[] args) {
        Animal a = new Animal();
        Cat c = (Cat) a;
    }
}`,
      c: ["It does not compile.", "It runs without any problem.", "It compiles but throws ClassCastException at runtime.", "It compiles but throws ArithmeticException at runtime."], a: "C", e: "Rule 2: a is an Animal, not a Cat, so the cast fails at runtime.",
    },
    { q: "Which exception is thrown at runtime when an object being cast is NOT actually an instance of that class?", c: ["NullPointerException", "ClassCastException", "ArithmeticException", "IllegalArgumentException"], a: "B", e: "An invalid downcast throws ClassCastException." },
    { q: "Why does casting between two unrelated classes fail to compile?", c: ["Both classes are public.", "There is no inheritance between the two classes.", "The classes have no constructors.", "Casting is only allowed for primitives."], a: "B", e: "Casting requires a parent/child relationship." },
    { q: "Which of the following is a rule in overriding methods?", c: ["The child method must have a different parameter list.", "The child method must have the same signature as the parent method.", "The child method must be private.", "The child method must be static."], a: "B", e: "Same name + same parameter types." },
    { q: "Which of the following is NOT a rule in overriding methods?", c: ["The child method must have the same signature as the parent method.", "The child method must be at least as accessible as the parent method.", "The child method may not throw a new or broader checked exception.", "The child method must have a different return type from the parent method."], a: "D", e: "The return type must stay compatible; changing it is not a rule." },
    {
      q: "Why does the code below NOT compile?",
      code: `public class ClassA {
    protected String message() { return "Method"; }
}
public class ClassB extends ClassA {
    private String message() { return " Overriding"; }
}`,
      c: ["ClassB must be abstract.", "The overriding method is less accessible than the parent method.", "The method names are different.", "ClassA must be final."], a: "B", e: "protected → private reduces visibility, which breaks rule 2.",
    },
    {
      q: "How can the compilation error in the previous ClassA/ClassB example be resolved?",
      code: `public class ClassB extends ClassA {
    private String message() { return " Overriding"; }
}`,
      c: ["Mark ClassB's message() as public or protected.", "Mark ClassB's message() as static.", "Remove the return statement.", "Mark ClassA's message() as private."], a: "A", e: "The handout's fix: make the subclass method public or protected.",
    },
    { q: "If the parent class method is declared public, which access modifier can be used in the overriding method?", c: ["private", "package-private", "protected", "public"], a: "D", e: "Nothing is more accessible than public, so the override must also be public." },
    {
      q: "Why does the code below NOT compile?",
      code: `public class ClassA {
    public String message() { return "Method"; }
}
public class ClassB extends ClassA {
    public String message() throws Exception {
        return " Overriding";
    }
}`,
      c: ["The child method throws a new checked exception.", "The child method is less accessible.", "The method signatures are different.", "Exception is not a valid class."], a: "A", e: "The parent's message() throws nothing, so the child cannot add a checked exception.",
    },
    {
      q: "Why does the code below NOT compile?",
      code: `public class ClassA {
    public String message() throws ArithmeticException {
        return "Method";
    }
}
public class ClassB extends ClassA {
    public String message() throws Exception {
        return " Overriding";
    }
}`,
      c: ["ArithmeticException cannot be thrown.", "The child method throws a broader exception than the parent method.", "Both methods must be static.", "The child method must be private."], a: "B", e: "Exception is broader than ArithmeticException, which breaks rule 3.",
    },
    {
      q: "What is the output of the code below?",
      code: `class A {
    String show() { return "A"; }
}
class B extends A {
    String show() { return "B"; }
}
public class Test {
    public static void main(String[] args) {
        A obj = new B();
        System.out.print(obj.show());
    }
}`,
      c: ["A", "B", "AB", "Compilation error"], a: "B", e: "Dynamic polymorphism: the actual object is a B, so B's override runs.",
    },
    { q: "Which keyword lets an overriding method call the parent class version of the same method?", c: ["this", "super", "extends", "new"], a: "B", e: "super.message() calls the parent's implementation." },
    { q: "Which of the following is TRUE about upcasting?", c: ["It always needs an explicit cast.", "It can be done implicitly.", "It throws ClassCastException.", "It is only allowed between unrelated classes."], a: "B", e: "A subclass object is always a superclass type, so no cast is needed." },
    { q: "Which of the following is TRUE about downcasting?", c: ["It is done implicitly.", "It requires an explicit cast and may fail at runtime.", "It never compiles.", "It changes the object itself."], a: "B", e: "Downcasts need (Type) and can throw ClassCastException if the object is the wrong type." },
    {
      q: "Given the overloaded methods below, which method is called by draw(5, 2.5)?",
      code: `public void draw(String s) { }
public void draw(int i) { }
public void draw(int i, double f) { }`,
      c: ["draw(String s)", "draw(int i)", "draw(int i, double f)", "Compilation error"], a: "C", e: "Two arguments, int and double, match draw(int, double).",
    },
    {
      q: "Which line causes a compilation error?",
      code: `class Animal { }
class Cat extends Animal { }
class Dog { }
// inside main:
Animal a = new Cat();   // line 1
Cat c = (Cat) a;        // line 2
Dog d = (Dog) c;        // line 3`,
      c: ["line 1", "line 2", "line 3", "No error"], a: "C", e: "Dog is unrelated to Cat, so the compiler rejects the cast.",
    },
    { q: "A superclass reference variable can refer to which of the following?", c: ["Only objects of the superclass", "Objects of the superclass or any of its subclasses", "Only objects of unrelated classes", "Only primitive values"], a: "B", e: "That is what makes upcasting and dynamic polymorphism possible." },
  ],
};

const java = {
  slug: "java",
  code: "IT1908",
  title: "Advanced Java Programming",
  short: "Java",
  sheet: "green",
  terms: [prelim, midterm, prefinal, finals],
};

export default java;
