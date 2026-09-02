import { InterviewQuestion, TopicCategory } from '../models/interview.models';

export const JAVA_TOPIC: TopicCategory = {
  slug: 'java',
  name: 'Java',
  type: 'language',
  icon: 'J',
  description: 'Core Java Interview Handbook - Principal Level.'
};

export const JAVA_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'java-q1',
    topicSlug: 'java',
    title: 'What is the difference between JDK, JRE, and JVM?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: The JVM is the runtime engine that executes bytecode; the JRE bundles the JVM with core libraries needed to run Java applications; the JDK bundles the JRE plus development tools (javac, javadoc, jdb) needed to build Java applications.',
      'JVM (Java Virtual Machine): an abstract specification implemented per-platform; loads .class files, verifies bytecode, and executes it via interpretation and JIT compilation.',
      'JRE (Java Runtime Environment): JVM + standard class libraries + supporting files. Sufficient to run compiled Java programs.',
      'JDK (Java Development Kit): JRE + compiler (javac), debugger, jlink, jshell, and other dev tools.',
      'Component | Contains | Purpose',
      'JVM | Class loader, bytecode verifier, execution engine | Executes bytecode',
      'JRE | JVM + core libraries | Run Java apps',
      'JDK | JRE + compiler + dev tools | Build & run Java apps'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Understanding the tools involved.',
      codeSnippet: {
        language: 'java',
        code: `// javac compiles this .java file into HelloWorld.class (bytecode) — requires JDK.
// java launches the JVM, which loads and executes HelloWorld.class — requires only JRE/JVM.
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Running inside the JVM");
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Interviewers often probe whether you know the JDK/JRE split disappeared structurally after Java 9\'s module system (JPMS) — modern JDKs let you build custom runtime images with jlink that are smaller than a traditional JRE.'
      }
    }
  },
  {
    id: 'java-q2',
    topicSlug: 'java',
    title: 'Why is Java platform-independent, while JVM is platform-dependent?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: Java source code compiles to an intermediate, platform-neutral format called bytecode, which any conforming JVM can execute — but each JVM implementation itself is natively compiled per operating system and CPU architecture.',
      '"Write Once, Run Anywhere" (WORA) refers to the .class bytecode file, not the JVM binary.',
      'Each OS/architecture (Windows x64, Linux ARM, macOS, etc.) requires its own native JVM build, compiled in C/C++ for that platform.',
      'The bytecode format itself is standardized by the Java Virtual Machine Specification, so any compliant JVM interprets it identically.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Demonstrating platform independence.',
      codeSnippet: {
        language: 'java',
        code: `// This same HelloWorld.class runs unmodified on Windows, Linux, and macOS —
// as long as each platform has its own natively-compiled JVM binary installed.
public class Platform {
    public static void main(String[] args) {
        System.out.println(System.getProperty("os.name")); // JVM reports host OS
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: A classic trap: interviewers ask "so is Java 100% platform-independent?" — the correct nuance is that native code accessed via JNI (Java Native Interface) breaks portability, since that native layer is platform-specific.'
      }
    }
  },
  {
    id: 'java-q3',
    topicSlug: 'java',
    title: 'What is the JIT (Just-In-Time) compiler, and how does tiered compilation work?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: The JIT compiler translates frequently-executed bytecode ("hot" methods) into native machine code at runtime, avoiding the overhead of repeated interpretation. Tiered compilation blends the fast-starting C1 (client) compiler with the highly-optimizing C2 (server) compiler.',
      'Interpretation is slow per-instruction; JIT compiles hot paths to native code cached by the JVM.',
      'C1: quick, lightly-optimized compilation — good for startup-sensitive code.',
      'C2: slower, aggressively-optimized (inlining, loop unrolling, escape analysis) — used for long-running hot methods.',
      'Tiers 0–4: interpreter → C1 (no profiling) → C1 (light profiling) → C1 (full profiling) → C2.',
      'Method invocation counters and back-edge (loop) counters trigger tier promotion.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Triggering JIT compilation.',
      codeSnippet: {
        language: 'java',
        code: `public class JitDemo {
    public static void main(String[] args) {
        long sum = 0;
        // Loop runs enough times to trigger JIT compilation of hotSum()
        for (int i = 0; i < 5_000_000; i++) {
            sum += hotSum(i);
        }
        System.out.println(sum);
    }
    static int hotSum(int x) { return x * 2; } // becomes a JIT compilation candidate
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Be ready to explain deoptimization — C2 can speculatively inline based on observed types, and if that assumption is later violated (e.g., a new subclass appears), the JVM falls back ("bails out") to interpreted execution.'
      }
    }
  },
  {
    id: 'java-q4',
    topicSlug: 'java',
    title: 'What happens during class loading, linking, and initialization?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: Class loading is a three-phase process: loading reads the .class bytecode into the JVM and creates a Class object; linking verifies, prepares, and resolves; initialization executes static initializers and static variable assignments in source order.',
      'Loading: performed by a ClassLoader; parses the class file, creates the runtime representation.',
      'Linking: Verification (checks structural correctness), Preparation (static fields get default values like 0, null), Resolution (symbolic references resolved to direct references).',
      'Initialization: static blocks and static field initializers run top-to-bottom; triggered lazily, on first active use.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Class Loading Phases in Action.',
      codeSnippet: {
        language: 'java',
        code: `class Config {
    static int value = compute(); // Preparation sets 0 first, then Initialization runs compute()
    static { System.out.println("Static block runs during initialization"); }
    static int compute() { return 42; }
}
public class LoadingDemo {
    public static void main(String[] args) {
        System.out.println("Before touching Config");
        System.out.println(Config.value); // triggers loading -> linking -> initialization here
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: A classic gotcha: accessing a static final compile-time constant (e.g., int or String literal) does not trigger class initialization because the compiler inlines the constant value directly into the caller\'s bytecode.'
      }
    }
  },
  {
    id: 'java-q5',
    topicSlug: 'java',
    title: 'How does the ClassLoader hierarchy and delegation principle work?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: Java class loaders form a parent-delegation hierarchy — Bootstrap → Platform/Extension → Application (System) → custom loaders — where each loader first delegates a load request to its parent before attempting to load the class itself.',
      'Bootstrap ClassLoader: native code, loads core JDK classes.',
      'Platform ClassLoader (Extension pre-Java 9): loads JDK platform modules.',
      'Application/System ClassLoader: loads classes from the classpath.',
      'Custom ClassLoaders: user-defined, extend ClassLoader, override findClass().',
      'Delegation model (loadClass()): child asks parent first; only loads itself if the parent can\'t find the class — prevents core class shadowing/spoofing.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Checking the ClassLoader.',
      codeSnippet: {
        language: 'java',
        code: `public class LoaderDemo {
    public static void main(String[] args) {
        System.out.println(String.class.getClassLoader());       // null -> loaded by Bootstrap
        System.out.println(LoaderDemo.class.getClassLoader());   // Application/System loader
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Follow-up: "How would you break delegation?" — answer with parent-last / child-first loaders, common in app servers and plugin systems to allow app-specific library versions to override shared ones.'
      }
    }
  },
  {
    id: 'java-q6',
    topicSlug: 'java',
    title: 'Why is Java not considered a 100% pure object-oriented language?',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: Java retains eight primitive types (int, boolean, char, etc.) that are not objects and don\'t participate in the class hierarchy, and it supports static members/methods that can be accessed without an object instance.',
      'Primitives live on the stack (or inline in objects) and lack methods, identity, or polymorphic behavior.',
      'Static methods/fields belong to the class, not an instance.',
      'Java also permits primitive arrays with special bytecode handling rather than being fully classed.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Demonstrating primitives and static access.',
      codeSnippet: {
        language: 'java',
        code: `public class Purity {
    public static void main(String[] args) {
        int x = 5; // primitive, not an object — no methods, no identity
        Integer boxed = x; // autoboxing creates an actual object wrapping x
        System.out.println(Math.max(x, 10)); // static call, no instance of Math needed
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: If pressed for "purely OOP" languages, cite Smalltalk or Ruby, where even integers are objects responding to messages.'
      }
    }
  },
  {
    id: 'java-q7',
    topicSlug: 'java',
    title: 'What are the 8 primitive data types in Java, their memory footprints, and default values?',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: Java has 8 primitives — byte, short, int, long, float, double, char, boolean — each with a fixed memory size defined by the JVM spec.',
      'byte: 8 bits, default 0',
      'short: 16 bits, default 0',
      'int: 32 bits, default 0',
      'long: 64 bits, default 0L',
      'float: 32 bits, default 0.0f',
      'double: 64 bits, default 0.0d',
      'char: 16 bits, default \\u0000',
      'boolean: JVM-dependent (~1 bit logically), default false',
      'Defaults apply only to fields (instance/static); local variables must be explicitly initialized before use.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Primitive defaults.',
      codeSnippet: {
        language: 'java',
        code: `public class Primitives {
    static int i;      // defaults to 0
    static boolean b;  // defaults to false
    public static void main(String[] args) {
        int local; // no default — must assign before use
        local = 10;
        System.out.println(i + " " + b + " " + local);
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap question: "What\'s the default value of a local int?" — there isn\'t one; the compiler enforces definite assignment, unlike fields.'
      }
    }
  },
  {
    id: 'java-q8',
    topicSlug: 'java',
    title: 'What is the difference between == and the .equals() method?',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: == compares primitive values directly, or for objects, compares reference identity (whether two variables point to the same memory address); .equals() is a method that is commonly overridden to compare logical/content equality instead.',
      'For primitives, == is the only equality operator.',
      'For objects, == never considers content, only identity.',
      '.equals() is overridable; String, wrapper classes, and collections override it for value-based equality.',
      'If a class doesn\'t override .equals(), it inherits Object.equals(), which behaves identically to ==.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Equality comparison.',
      codeSnippet: {
        language: 'java',
        code: `public class EqualsDemo {
    public static void main(String[] args) {
        String a = new String("java");
        String b = new String("java");
        System.out.println(a == b);        // false: different objects on the heap
        System.out.println(a.equals(b));   // true: String overrides equals() for content
        String c = "java", d = "java";
        System.out.println(c == d);        // true: both point to the same String Constant Pool entry
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Classic trap: comparing boxed Integer objects with == outside the cache range (-128 to 127) silently returns false.'
      }
    }
  },
  {
    id: 'java-q9',
    topicSlug: 'java',
    title: 'What is the difference between implicit widening and explicit narrowing type casting?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: Widening conversion automatically promotes a smaller type to a larger, compatible type without data loss; narrowing conversion moves from a larger to a smaller type and requires an explicit cast because it can lose precision or magnitude.',
      'Widening order: byte → short → int → long → float → double.',
      'Narrowing double→int truncates the fractional part (not rounds); narrowing across large long→int can overflow silently.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Casting demonstration.',
      codeSnippet: {
        language: 'java',
        code: `public class CastingDemo {
    public static void main(String[] args) {
        int i = 100;
        long l = i;            // implicit widening — no cast needed
        double d = 9.99;
        int truncated = (int) d; // explicit narrowing — required cast, result is 9 (not 10)
        System.out.println(l + " " + truncated);
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Interviewers love asking about long → float — it\'s technically "widening" per the JLS, yet can lose precision (not magnitude).'
      }
    }
  },
  {
    id: 'java-q10',
    topicSlug: 'java',
    title: 'What are short-circuit logical operators (&&, ||) versus standard bitwise operators (&, |)?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: && and || are short-circuit: they skip evaluating the right operand when the result is already determined by the left, while & and |, when applied to booleans, always evaluate both operands.',
      'a && b: if a is false, b is never evaluated — result is false.',
      'a || b: if a is true, b is never evaluated — result is true.',
      'a & b / a | b on booleans: both sides always evaluated, useful when the right side has a required side-effect.',
      'On integer operands, &/|/^ perform true bitwise AND/OR/XOR at the bit level.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Short-circuiting in action.',
      codeSnippet: {
        language: 'java',
        code: `public class ShortCircuitDemo {
    static boolean sideEffect() {
        System.out.println("called");
        return true;
    }
    public static void main(String[] args) {
        boolean r1 = false && sideEffect(); // "called" never printed — short-circuited
        boolean r2 = false & sideEffect();  // "called" IS printed — & always evaluates both
        System.out.println(r1 + " " + r2);
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: A real-world trap: if (obj != null & obj.getValue() > 0) risks a NullPointerException because & doesn\'t short-circuit.'
      }
    }
  },
  {
    id: 'java-q11',
    topicSlug: 'java',
    title: 'Why does 0.1 + 0.2 != 0.3 evaluate to true in Java floating-point arithmetic?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: 0.1 and 0.2 cannot be represented exactly in IEEE 754 binary floating-point format, so their stored approximations sum to a value slightly different from the stored approximation of 0.3, making the == comparison false.',
      'The rounding errors introduced during binary encoding propagate through arithmetic operations.',
      'For exact decimal arithmetic (e.g., currency), use BigDecimal constructed from String, not double.',
      'Comparing floating-point values for equality should use an epsilon tolerance (Math.abs(a - b) < epsilon) rather than ==.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Floating point precision issue.',
      codeSnippet: {
        language: 'java',
        code: `import java.math.BigDecimal;
public class FloatDemo {
    public static void main(String[] args) {
        System.out.println(0.1 + 0.2 == 0.3);              // false
        System.out.println(0.1 + 0.2);                     // 0.30000000000000004
        BigDecimal exact = new BigDecimal("0.1").add(new BigDecimal("0.2"));
        System.out.println(exact.compareTo(new BigDecimal("0.3")) == 0); // true — exact decimal math
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Watch for candidates who suggest float/double for financial calculations — that\'s an immediate red flag.'
      }
    }
  },
  {
    id: 'java-q12',
    topicSlug: 'java',
    title: 'What is the difference between Stack memory and Heap memory?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: Stack memory holds method call frames — local variables, primitives, and object references — and is per-thread with automatic LIFO cleanup on method return; heap memory holds all objects and arrays, is shared across threads, and is managed by the garbage collector.',
      'Stack: fast allocation/deallocation, fixed-ish size (-Xss), throws StackOverflowError on excessive depth.',
      'Heap: shared JVM-wide, sized via -Xms/-Xmx, subject to GC, throws OutOfMemoryError: Java heap space when exhausted.',
      'Object references are stored on the stack; the actual object data lives on the heap.',
      'Heap is further divided generationally (Young/Eden+Survivor, Old/Tenured) in most collectors for GC efficiency.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Stack vs Heap.',
      codeSnippet: {
        language: 'java',
        code: `public class MemoryDemo {
    public static void main(String[] args) {
        int localPrimitive = 42;              // stored directly on the stack
        StringBuilder sb = new StringBuilder(); // 'sb' reference on stack, object on heap
        recurse(0);
    }
    static void recurse(int depth) {
        recurse(depth + 1); // uncontrolled recursion -> StackOverflowError
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Follow-up trap: ask about escape analysis — modern JVMs can allocate objects that provably never "escape" a method directly on the stack.'
      }
    }
  },
  {
    id: 'java-q13',
    topicSlug: 'java',
    title: 'Can you declare a main method as private or without static? What happens at compile time vs runtime?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: The code compiles fine either way since public static void main(String[]) is only a JVM launch convention, not a language rule — but if main isn\'t exactly public static void main(String[] args), the JVM launcher fails at runtime with a NoSuchMethodError.',
      'The compiler doesn\'t require any particular method to exist named main.',
      'The JVM\'s class launcher specifically looks up a method matching the exact signature public static void main(String[]).',
      'Declaring main private or non-static compiles successfully, but running it throws an Error.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Invalid main signature.',
      codeSnippet: {
        language: 'java',
        code: `public class MainDemo {
    // Compiles fine, but 'java MainDemo' fails at launch: not the expected public static signature
    private void main(String[] args) {
        System.out.println("never reached via java MainDemo");
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: candidates often think this is a compile-time error — clarify it\'s strictly a runtime launcher failure.'
      }
    }
  },
  {
    id: 'java-q14',
    topicSlug: 'java',
    title: 'What are varargs (...) in Java, and what restrictions apply to their placement in a method signature?',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: Varargs (Type... name) let a method accept a variable number of arguments of a given type, internally treated as an array; a method can have at most one varargs parameter, and it must be the last parameter in the signature.',
      'Compiler desugars String... args into String[] args internally.',
      'Only one varargs parameter allowed per method, and it must come last, so the compiler can unambiguously match preceding fixed parameters.',
      'Overload resolution prefers a non-varargs match over a varargs match when both are applicable.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Using varargs.',
      codeSnippet: {
        language: 'java',
        code: `public class VarargsDemo {
    static int sum(String label, int... nums) { // varargs must be last
        int total = 0;
        for (int n : nums) total += n;
        System.out.println(label + ": " + total);
        return total;
    }
    public static void main(String[] args) {
        sum("empty");            // zero varargs args allowed
        sum("three", 1, 2, 3);   // treated as new int[]{1,2,3}
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: void m(int... a, String b) fails to compile — interviewers use this to check if you understand varargs must be trailing.'
      }
    }
  },
  {
    id: 'java-q15',
    topicSlug: 'java',
    title: 'What is local-variable type inference (var), and where is it forbidden?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: Introduced in Java 10, var lets the compiler infer a local variable\'s static type from its initializer expression at compile time.',
      'It\'s pure syntactic sugar (the variable is still strongly, statically typed) and is restricted to local variables with initializers.',
      'Forbidden for: instance/static fields, method parameters, return types, uninitialized locals, and when initialized with null alone.',
      'Cannot be used with array initializer shorthand (var arr = {1,2,3}; is illegal).'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Using var.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.*;
public class VarDemo {
    public static void main(String[] args) {
        var list = new ArrayList<String>(); // inferred as ArrayList<String>
        list.add("Chennai");
        var count = list.size();            // inferred as int
        System.out.println(count);
        // var broken;        // illegal — no initializer to infer from
        // var n = null;      // illegal — cannot infer type from null
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: var is not dynamic typing — var x = "hi"; x = 5; still fails to compile.'
      }
    }
  },
  {
    id: 'java-q16',
    topicSlug: 'java',
    title: 'What are the four core pillars of OOP, and how are they implemented in Java?',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: The four pillars are Encapsulation, Inheritance, Polymorphism, and Abstraction.',
      'Encapsulation: private fields + public getters/setters, access modifiers.',
      'Inheritance: extends (classes), implements (interfaces).',
      'Polymorphism: Method overloading (compile-time), overriding (runtime).',
      'Abstraction: abstract class, interface.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Pillars of OOP.',
      codeSnippet: {
        language: 'java',
        code: `abstract class Shape { // Abstraction
    abstract double area(); // contract, no implementation
}
class Circle extends Shape { // Inheritance
    private double radius; // Encapsulation
    Circle(double radius) { this.radius = radius; }
    @Override double area() { return Math.PI * radius * radius; } // Polymorphism
}
public class OopDemo {
    public static void main(String[] args) {
        Shape s = new Circle(2.0); // reference type Shape, runtime type Circle
        System.out.println(s.area());
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Interviewers frequently ask you to distinguish compile-time (overload) vs runtime (override) polymorphism explicitly.'
      }
    }
  },
  {
    id: 'java-q17',
    topicSlug: 'java',
    title: 'What is method overloading versus method overriding?',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: Overloading is defining multiple methods with the same name but different parameter lists within the same class, resolved at compile time; overriding is redefining a superclass/interface method with the same signature in a subclass, resolved at runtime.',
      'Overloading: Compile-time (static binding). Signature must differ. Access modifier can differ freely.',
      'Overriding: Runtime (dynamic binding). Signature must match exactly (return type covariant allowed). Access modifier cannot be more restrictive.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Overload vs Override.',
      codeSnippet: {
        language: 'java',
        code: `class Animal {
    void speak() { System.out.println("Some sound"); } // to be overridden
    void feed(int amount) { }                            // overload base
    void feed(double amount) { }                          // overload — different param type
}
class Dog extends Animal {
    @Override void speak() { System.out.println("Bark"); } // overriding
}
public class OverloadOverride {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.speak(); // "Bark" — runtime dispatch based on actual object
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask what happens if only the return type differs between two methods with identical name+params — that\'s a compile error, not a valid overload.'
      }
    }
  },
  {
    id: 'java-q18',
    topicSlug: 'java',
    title: 'Can we override a static method? What is method hiding?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: No — static methods belong to the class, not instances, so they cannot be polymorphically overridden.',
      'Declaring a same-signature static method in a subclass instead hides the parent\'s version, and which one runs is determined by the reference\'s static type, not the runtime object type.',
      'Method hiding looks syntactically similar to overriding but behaves completely differently for call resolution.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Method hiding.',
      codeSnippet: {
        language: 'java',
        code: `class Parent {
    static void greet() { System.out.println("Parent static"); }
}
class Child extends Parent {
    static void greet() { System.out.println("Child static"); } // hides, doesn't override
}
public class HidingDemo {
    public static void main(String[] args) {
        Parent p = new Child();
        p.greet(); // prints "Parent static" — resolved by static reference type Parent!
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: This exact code snippet is a favorite interview trap — many candidates incorrectly expect "Child static" due to confusing it with instance method polymorphism.'
      }
    }
  },
  {
    id: 'java-q19',
    topicSlug: 'java',
    title: 'Can you override a private or final method? Why or why not?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: No — private methods aren\'t inherited/visible to subclasses at all, and final methods are explicitly locked by the language to prevent any subclass from changing their behavior.',
      'If a subclass defines a method with the same signature as a private parent method, it\'s simply an independent new method.',
      'final methods can be inherited and called, but the compiler rejects any subclass attempt to redefine them.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Private and final methods.',
      codeSnippet: {
        language: 'java',
        code: `class Base {
    private void secret() { System.out.println("Base secret"); } // not inherited
    final void locked() { System.out.println("Base locked"); }   // cannot be overridden
}
class Derived extends Base {
    private void secret() { System.out.println("Derived secret"); } // unrelated new method
    // void locked() { } // COMPILE ERROR if uncommented — cannot override final method
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Follow-up: ask whether a subclass can overload (not override) a final method — yes, adding a different parameter list is legal since it\'s a distinct signature.'
      }
    }
  },
  {
    id: 'java-q20',
    topicSlug: 'java',
    title: 'What is covariant method overriding (introduced in Java 5)?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: Covariant return types allow an overriding method in a subclass to return a more specific (narrower) type than the return type declared in the superclass method, as long as that type is a subtype of the original.',
      'Before Java 5, overriding methods had to have identical return types.',
      'Only applies to reference types; primitive return types must still match exactly.',
      'Implemented via the JVM\'s bridge methods — the compiler generates a synthetic bridge method with the original erased signature to preserve binary compatibility.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Covariant Return Types.',
      codeSnippet: {
        language: 'java',
        code: `class Animal {
    Animal reproduce() { return new Animal(); }
}
class Dog extends Animal {
    @Override
    Dog reproduce() { return new Dog(); } // covariant return: Dog is-a Animal
}
public class CovariantDemo {
    public static void main(String[] args) {
        Dog d = new Dog().reproduce(); // no cast needed — return type is already Dog
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Ask candidates to explain bridge methods via javap -c output — this separates candidates who truly understand JVM internals.'
      }
    }
  },
  {
    id: 'java-q21',
    topicSlug: 'java',
    title: 'What is the purpose of the super and this keywords?',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: this refers to the current object instance, used to disambiguate fields from parameters and to chain constructors within the same class; super refers to the immediate parent class, used to access overridden methods/hidden fields and to invoke the parent\'s constructor.',
      'Both this() and super(), if used, must be the very first statement in a constructor — and they\'re mutually exclusive.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Using super and this.',
      codeSnippet: {
        language: 'java',
        code: `class Vehicle {
    Vehicle() { System.out.println("Vehicle constructed"); }
    void describe() { System.out.println("A vehicle"); }
}
class Car extends Vehicle {
    Car() {
        super(); // explicit call to parent constructor (implicit if omitted)
        System.out.println("Car constructed");
    }
    @Override void describe() {
        super.describe(); // calls Vehicle's version explicitly
        System.out.println("A car specifically");
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask if this() and super() can both appear in one constructor — they cannot.'
      }
    }
  },
  {
    id: 'java-q22',
    topicSlug: 'java',
    title: 'What is constructor chaining, and why must super() or this() be the first statement in a constructor?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: Constructor chaining is the practice of one constructor invoking another (this(...) within the same class, or super(...) in the parent), and it must be the first statement so the JVM guarantees the entire inheritance chain is fully initialized top-down before any subclass-specific logic executes.',
      'If neither this() nor super() is explicitly written, the compiler inserts an implicit super() call to the parent\'s no-arg constructor.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Constructor Chaining.',
      codeSnippet: {
        language: 'java',
        code: `class Point {
    int x, y;
    Point() { this(0, 0); }              // chains to the two-arg constructor
    Point(int x, int y) { this.x = x; this.y = y; }
}
class Point3D extends Point {
    int z;
    Point3D(int x, int y, int z) {
        super(x, y); // must be first — initializes inherited x, y before z is set
        this.z = z;
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: instance initializer blocks run after super() but before the rest of the constructor body.'
      }
    }
  },
  {
    id: 'java-q23',
    topicSlug: 'java',
    title: 'Can an abstract class have a constructor? If yes, what is its purpose?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: Yes — abstract classes can (and often do) have constructors, even though they can never be instantiated directly; the constructor exists so concrete subclasses can initialize inherited fields via super(...), since the abstract class still participates in normal object construction as part of the chain.',
      'You cannot do new AbstractClass() directly — that remains illegal regardless of constructor presence.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Abstract class constructors.',
      codeSnippet: {
        language: 'java',
        code: `abstract class Employee {
    private final String name;
    Employee(String name) { this.name = name; } // constructor enforces name at construction
    abstract double calculateSalary();
    String getName() { return name; }
}
class Manager extends Employee {
    Manager(String name) { super(name); } // must supply name via chained constructor call
    @Override double calculateSalary() { return 90000; }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask "so when exactly does the abstract class\'s constructor run?" — it runs during subclass instantiation, as part of the top-down constructor chain, never on its own.'
      }
    }
  },
  {
    id: 'java-q24',
    topicSlug: 'java',
    title: 'What are the key differences between an abstract class and an interface?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: An abstract class can hold constructors, instance state (non-static, non-final fields), and a mix of abstract and concrete methods, supporting single inheritance; an interface historically held only abstract method signatures and constants, but since Java 8 can also include default/static methods, and a class may implement multiple interfaces.',
      'Abstract Class: Single inheritance, any fields, constructors allowed, concrete + abstract methods.',
      'Interface: Multiple inheritance, public static final only, no constructors, default/static/abstract methods.',
      'Choose abstract class when subclasses share common state/implementation; choose interface for a pure capability contract across unrelated class hierarchies.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Abstract Class vs Interface.',
      codeSnippet: {
        language: 'java',
        code: `interface Flyable { void fly(); default void land() { System.out.println("Landing"); } }
abstract class Bird {
    String species;
    Bird(String species) { this.species = species; } // state + constructor allowed
    abstract void makeSound();
}
class Eagle extends Bird implements Flyable {
    Eagle() { super("Eagle"); }
    @Override void makeSound() { System.out.println("Screech"); }
    @Override public void fly() { System.out.println(species + " flying"); }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: after Java 8\'s default methods, some candidates claim abstract classes are now "useless" — push back by noting interfaces still can\'t hold mutable instance state or constructors.'
      }
    }
  },
  {
    id: 'java-q25',
    topicSlug: 'java',
    title: 'What are default and static methods in interfaces, and how do they resolve diamond-inheritance conflicts?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: default methods (Java 8+) provide a concrete method body directly inside an interface, allowing implementations to be added without breaking existing implementers; static interface methods belong to the interface itself and aren\'t inherited.',
      'When a class implements two interfaces with conflicting default methods of the same signature, Java forces the implementing class to explicitly override and resolve the conflict, optionally delegating via InterfaceName.super.method().',
      'default methods were introduced to let core APIs evolve without breaking every existing implementation.',
      'static interface methods are utility methods scoped to the interface namespace.',
      'Class methods always win over interface default methods automatically ("class wins" rule).'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Resolving Diamond Conflict.',
      codeSnippet: {
        language: 'java',
        code: `interface A { default void hello() { System.out.println("A"); } }
interface B { default void hello() { System.out.println("B"); } }
class C implements A, B {
    @Override public void hello() {
        A.super.hello(); // explicitly choose A's version
        B.super.hello(); // and B's version, if desired
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask what happens if C does NOT override hello() in the diamond scenario above — it\'s a compile-time error, not a runtime ambiguity.'
      }
    }
  },
  {
    id: 'java-q26',
    topicSlug: 'java',
    title: 'What are private interface methods, and why were they introduced in Java 9?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: Java 9 introduced private (and private static) interface methods to let default/static methods share common code internally without exposing that helper logic as part of the interface\'s public API.',
      'Before Java 9, any shared logic between two default methods had to be duplicated or exposed as a public method — leaking implementation detail.',
      'private interface methods can only be called from within the interface itself.',
      'Improves encapsulation and reduces code duplication within interfaces.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Private helper in an interface.',
      codeSnippet: {
        language: 'java',
        code: `interface Logger {
    default void logInfo(String msg) { log("INFO", msg); }
    default void logError(String msg) { log("ERROR", msg); }
    private void log(String level, String msg) { // hidden helper
        System.out.println("[" + level + "] " + msg);
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask whether an implementing class can call or override the private interface method — it cannot; it\'s invisible outside the interface.'
      }
    }
  },
  {
    id: 'java-q27',
    topicSlug: 'java',
    title: 'What is the difference between composition, aggregation, and inheritance?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: Inheritance models an "is-a" relationship; composition models a strong "has-a" relationship where the contained object\'s lifecycle is tied to the container; aggregation is a weaker "has-a" relationship where the contained object can exist independently.',
      'Inheritance ("is-a"): Dog extends Animal',
      'Composition ("owns-a"): Car owns Engine (created inside Car, Engine dies when Car dies)',
      'Aggregation ("has-a"): Department has Employees (Employees exist independently)',
      '"Favor composition over inheritance" is a well-known design principle to avoid tight coupling and fragile base classes.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Composition Pattern.',
      codeSnippet: {
        language: 'java',
        code: `class Engine { void start() { System.out.println("Engine starting"); } }
class Car {
    private final Engine engine = new Engine(); // Composition
    void start() { engine.start(); } // delegation, not inheritance
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask for a real bug caused by deep inheritance vs. composition — e.g., java.util.Stack extends Vector, which leaks Vector\'s index-based methods.'
      }
    }
  },
  {
    id: 'java-q28',
    topicSlug: 'java',
    title: 'Why does Java not support multiple inheritance with classes?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: Java disallows multiple class inheritance to avoid the "diamond problem" — ambiguity when two parent classes define the same method/field and the compiler can\'t unambiguously decide which implementation to inherit.',
      'Java achieves similar flexibility safely through multiple interface implementation.',
      'Interfaces avoid the ambiguity for state (interfaces can\'t hold instance fields), and for default methods, Java forces explicit resolution.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Multiple inheritance of type.',
      codeSnippet: {
        language: 'java',
        code: `// illegal in Java: class Child extends Parent1, Parent2 { }
interface Swimmer { default void move() { System.out.println("Swim"); } }
interface Runner  { default void move() { System.out.println("Run");  } }
class Triathlete implements Swimmer, Runner {
    @Override public void move() { Swimmer.super.move(); } // explicit resolution
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask "is multiple inheritance completely absent from Java?" — no; multiple inheritance of type (via interfaces) is fully supported.'
      }
    }
  },
  {
    id: 'java-q29',
    topicSlug: 'java',
    title: 'What is dynamic method dispatch (runtime polymorphism)?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: Dynamic method dispatch is the mechanism by which the JVM determines, at runtime, which overridden method implementation to invoke based on the actual object type (not the reference\'s static type).',
      'Implemented internally via a virtual method table (vtable) lookup.',
      'Contrast with static binding (used for static, private, and final methods, and fields), resolved entirely at compile time.',
      'Field access is never polymorphic in Java — fields are resolved by the reference\'s static type.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Dynamic Dispatch vs Static Binding.',
      codeSnippet: {
        language: 'java',
        code: `class Shape { void draw() { System.out.println("Generic shape"); } }
class Square extends Shape { @Override void draw() { System.out.println("Square"); } }
public class DispatchDemo {
    public static void main(String[] args) {
        Shape s = new Square();
        s.draw(); // dynamic dispatch -> "Square"
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: contrast method dispatch with field access — ((Shape)square).someField accesses the Shape version of a shadowed field, since fields use static binding.'
      }
    }
  },
  {
    id: 'java-q30',
    topicSlug: 'java',
    title: 'What happens if an overriding method throws a broader checked exception than the parent method?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: It\'s a compile-time error — an overriding method may only throw the same checked exceptions as the parent, narrower/subtype checked exceptions, or none at all.',
      'This restriction preserves the Liskov Substitution Principle: any caller relying on the parent\'s declared throws clause must remain valid when substituting a subclass instance.',
      'Unchecked exceptions (RuntimeException and subclasses) are exempt — an override can throw any unchecked exception freely.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Exception constraints in overriding.',
      codeSnippet: {
        language: 'java',
        code: `class Parent {
    void process() throws java.io.IOException { }
}
class Child extends Parent {
    @Override
    void process() throws java.io.FileNotFoundException { } // OK: subtype of IOException
    // @Override void process() throws Exception { } // COMPILE ERROR: broader
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask if an override can throw an unrelated unchecked exception like IllegalStateException — yes, freely.'
      }
    }
  },
  {
    id: 'java-q31',
    topicSlug: 'java',
    title: 'What are marker interfaces, and what replaces them in modern Java?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: A marker interface is an empty interface used purely to "tag" a class with metadata that the JVM or libraries check via instanceof at runtime (e.g., Serializable, Cloneable).',
      'Modern Java favors annotations (e.g., custom @Retention(RUNTIME) annotations processed via reflection) for metadata tagging.',
      'Marker interfaces add no methods, so they can\'t enforce any behavioral contract.',
      'Annotations are strictly more powerful: they support parameters, retention policies, and target restrictions.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Marker Interface vs Annotation.',
      codeSnippet: {
        language: 'java',
        code: `import java.io.Serializable;
class User implements Serializable { // marker interface
    private static final long serialVersionUID = 1L;
    String name;
}
// Modern annotation-based equivalent pattern:
@interface Auditable { } // custom marker annotation`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask why Cloneable is considered broken — it doesn\'t declare a clone() method at all; the contract is entirely implicit.'
      }
    }
  },
  {
    id: 'java-q32',
    topicSlug: 'java',
    title: 'What is the difference between shallow copy and deep copy in object cloning?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: A shallow copy duplicates an object\'s top-level fields, but reference-type fields still point to the same nested objects; a deep copy recursively duplicates all nested mutable objects too.',
      'Object.clone() performs a shallow copy by default.',
      'Shallow copies risk unintended shared mutable state.',
      'Deep copy requires manually cloning each mutable reference field (recursively), or using serialization-based copying.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Shallow vs Deep Copy.',
      codeSnippet: {
        language: 'java',
        code: `class Address { String city; Address(String city) { this.city = city; } }
class Person implements Cloneable {
    String name; Address address;
    Person(String name, Address address) { this.name = name; this.address = address; }
    @Override public Person clone() {
        return new Person(this.name, this.address); // Shallow copy
    }
    Person deepClone() {
        return new Person(this.name, new Address(this.address.city)); // Deep copy
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask candidates to demonstrate the bug — mutate original.address.city after a shallow clone and show the "copy" also changed.'
      }
    }
  },
  {
    id: 'java-q33',
    topicSlug: 'java',
    title: 'What is the contract between equals() and hashCode()?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: If two objects are equal according to .equals(), they must return the same .hashCode() value.',
      'The converse isn\'t required — unequal objects may (rarely) share a hash code (a "collision").',
      'Violating this contract causes silent bugs: an object correctly found via .equals() in a List may become "lost" inside a HashSet/HashMap.',
      'Both methods should be overridden together, using the same set of fields.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Implementing the contract.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.Objects;
class Point {
    int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }
    @Override public boolean equals(Object o) {
        if (!(o instanceof Point)) return false;
        Point p = (Point) o;
        return x == p.x && y == p.y;
    }
    @Override public int hashCode() { return Objects.hash(x, y); }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: give candidates a class that overrides equals() but not hashCode(), and ask why set.contains(equalObject) returns false.'
      }
    }
  },
  {
    id: 'java-q34',
    topicSlug: 'java',
    title: 'What happens if two unequal objects return the same hashCode()?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: This is a legal and expected scenario called a hash collision.',
      'Hash-based collections handle it by storing both objects in the same bucket (as a linked list or tree) and falling back to .equals() during lookup.',
      'A poorly distributed hashCode() (e.g., always returning 1) degrades a HashMap to O(n) behavior.',
      'Since Java 8, if a single bucket exceeds a threshold (default 8) and the table is large enough, that bucket treeifies into a red-black tree (O(log n)).'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Hash Collisions.',
      codeSnippet: {
        language: 'java',
        code: `class BadHash {
    int id;
    BadHash(int id) { this.id = id; }
    @Override public int hashCode() { return 1; } // legal but terrible
    @Override public boolean equals(Object o) {
        return o instanceof BadHash && ((BadHash) o).id == this.id;
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Follow-up: ask about the Java 8 HashMap treeification threshold (TREEIFY_THRESHOLD = 8).'
      }
    }
  },
  {
    id: 'java-q35',
    topicSlug: 'java',
    title: 'What is an anonymous inner class, and how does it differ from a local inner class?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: An anonymous inner class is a one-off, unnamed class defined and instantiated in a single expression; a local inner class is a named class declared inside a method body.',
      'Anonymous classes can\'t have explicit constructors and can only extend one class or implement one interface.',
      'Local inner classes can implement multiple interfaces and be instantiated multiple times.',
      'Both can capture "effectively final" local variables from the enclosing scope.',
      'Lambda expressions (Java 8+) largely replaced anonymous classes for functional interfaces.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Anonymous vs Local Inner Class.',
      codeSnippet: {
        language: 'java',
        code: `interface Greeter { void greet(); }
public class InnerClassDemo {
    public static void main(String[] args) {
        String name = "Rishi"; // effectively final
        Greeter anon = new Greeter() { // anonymous
            @Override public void greet() { System.out.println("Hi " + name); }
        };
        class LocalGreeter implements Greeter { // local
            @Override public void greet() { System.out.println("Hello " + name); }
        }
        new LocalGreeter().greet();
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask why captured local variables must be "effectively final" — because the JVM copies the value, preventing state inconsistencies.'
      }
    }
  },
  {
    id: 'java-q36',
    topicSlug: 'java',
    title: 'Why is String immutable in Java?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: String is immutable so it can be safely cached in the String Constant Pool, shared across threads without synchronization, used securely as keys in HashMaps, and relied upon by the security model.',
      'Security: parameters like file paths are often passed as String; mutability would allow post-validation tampering.',
      'Caching hashCode: String caches its computed hash code, safe only because the content never changes.',
      'Thread safety: immutable objects require no synchronization for concurrent reads.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'String Immutability.',
      codeSnippet: {
        language: 'java',
        code: `public class ImmutableDemo {
    public static void main(String[] args) {
        String s1 = "hello";
        String s2 = s1.concat(" world"); // creates a NEW String
        System.out.println(s1); // still "hello"
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask "if String is immutable, why does StringBuilder.append() mutate in place?" — StringBuilder has its own resizable char[] buffer, unrelated to String\'s immutability.'
      }
    }
  },
  {
    id: 'java-q37',
    topicSlug: 'java',
    title: 'What is the String Constant Pool (SCP), and where does it reside in memory?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: The SCP is a special memory region that caches unique String literal instances so identical literals share a single object.',
      'Since Java 7, it resides in the main heap (no longer PermGen), making it subject to normal garbage collection.',
      'String literals are automatically interned; new String() explicitly bypasses the pool.',
      '.intern() explicitly places or retrieves a string from the pool.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'SCP location and behavior.',
      codeSnippet: {
        language: 'java',
        code: `public class SCPDemo {
    public static void main(String[] args) {
        String a = "java";              
        String b = "java";              
        String c = new String("java");  
        System.out.println(a == b);         // true
        System.out.println(a == c);         // false
        System.out.println(a == c.intern()); // true
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask what changed about the SCP\'s memory location between Java 6 and Java 7+ — PermGen to heap migration.'
      }
    }
  },
  {
    id: 'java-q38',
    topicSlug: 'java',
    title: 'What is the difference between String s = "abc" and String s = new String("abc")?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: "abc" creates (or reuses) a single object in the String Constant Pool; new String("abc") always allocates a brand-new String object on the regular heap.',
      'Literal assignment resolves to a pool lookup/insert at class-loading/linking time.',
      'new String() forces heap allocation, producing logically equal strings but differing in == identity comparison.',
      'Using new String() is generally discouraged unless explicitly intentionally needing a distinct identity.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'String instantiation methods.',
      codeSnippet: {
        language: 'java',
        code: `public class NewStringDemo {
    public static void main(String[] args) {
        String pooled = "abc";
        String heapObj = new String("abc");
        System.out.println(pooled == heapObj);        // false
        System.out.println(pooled.equals(heapObj));    // true
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask "how many String objects are created by new String(\"abc\")?" — potentially two (one in pool, one in heap).'
      }
    }
  },
  {
    id: 'java-q39',
    topicSlug: 'java',
    title: 'What does the intern() method of String do?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: .intern() returns the canonical String Constant Pool representation of a given string\'s content.',
      'If an equal string exists in the pool, that shared reference is returned; otherwise, it is added.',
      'Useful for de-duplicating many equal-but-distinct String instances to reduce memory footprint.',
      'Since Java 7, it is safer to use since the SCP lives in the garbage-collected heap.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Using intern().',
      codeSnippet: {
        language: 'java',
        code: `public class InternDemo {
    public static void main(String[] args) {
        String a = new String("chennai").intern(); 
        String b = "chennai";                       
        System.out.println(a == b); // true
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask for a real production use case — interning repeated JSON key strings parsed from millions of records.'
      }
    }
  },
  {
    id: 'java-q40',
    topicSlug: 'java',
    title: 'What are the differences between String, StringBuilder, and StringBuffer?',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: String is immutable; StringBuilder is a mutable, high-performance sequence with no thread-safety; StringBuffer is functionally identical to StringBuilder but synchronizes all methods for thread-safety.',
      'String concatenation in a loop creates an O(n^2) object creation cost; StringBuilder reduces this to O(n).',
      'Use StringBuilder in single-threaded contexts (almost always); reserve StringBuffer for genuinely shared mutable buffers.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'StringBuilder vs StringBuffer.',
      codeSnippet: {
        language: 'java',
        code: `public class BuilderDemo {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder(); // fast, not thread-safe
        for (int i = 0; i < 5; i++) sb.append(i).append(","); 
        
        StringBuffer safeSb = new StringBuffer(); // synchronized, thread-safe
        safeSb.append("safe");
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask candidates why StringBuffer is rarely used today — thread-confinement (local builders) is preferred over shared synchronization.'
      }
    }
  },
  {
    id: 'java-q41',
    topicSlug: 'java',
    title: 'What is the usage and significance of the final keyword?',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: final on a variable prevents reassignment; on a method, it prevents overriding; on a class, it prevents subclassing.',
      'final variable: must be assigned exactly once.',
      'final method: locks the implementation contract.',
      'final class: entirely prevents inheritance (e.g., String, Integer).'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Using final everywhere.',
      codeSnippet: {
        language: 'java',
        code: `final class ImmutablePoint { // cannot be subclassed
    final int x, y; // must be assigned exactly once
    ImmutablePoint(int x, int y) { this.x = x; this.y = y; }
    final int sum() { return x + y; } // cannot be overridden
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask why making a class final can be a performance win — the JIT can more aggressively inline calls (devirtualization).'
      }
    }
  },
  {
    id: 'java-q42',
    topicSlug: 'java',
    title: 'Can a final reference variable have its internal state modified?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: Yes — final only prevents the reference itself from being reassigned; if the referenced object is mutable, its fields can still be changed.',
      'final guarantees reference-identity stability, not deep immutability.',
      'True immutability requires the referenced type itself to be immutable.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Final reference mutation.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.ArrayList;
import java.util.List;
public class FinalRefDemo {
    public static void main(String[] args) {
        final List<String> list = new ArrayList<>();
        list.add("allowed"); // mutating internal state is fine
        // list = new ArrayList<>(); // COMPILE ERROR
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask how to truly make a List field immutable — use List.copyOf() or Collections.unmodifiableList().'
      }
    }
  },
  {
    id: 'java-q43',
    topicSlug: 'java',
    title: 'What is a blank final variable, and where must it be initialized?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: A blank final variable is a final field declared without an initializer; it must be definitively assigned exactly once.',
      'For instance fields, it must be assigned in every constructor path.',
      'For static final fields, in a static initializer block.',
      'Useful for values only known at construction time.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Blank final variables.',
      codeSnippet: {
        language: 'java',
        code: `class Account {
    final String accountId; // blank final
    Account(String accountId) {
        this.accountId = accountId; // assigned exactly once
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: a class with two constructors where only one assigns a blank final fails to compile.'
      }
    }
  },
  {
    id: 'java-q44',
    topicSlug: 'java',
    title: 'What is the difference between final, finally, and finalize()?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: final is a language modifier; finally is a control-flow block guaranteed to execute after try; finalize() is a deprecated Object method for GC cleanup.',
      'final: variable reassignment / class inheritance restriction.',
      'finally: guaranteed execution for cleanup.',
      'finalize(): deprecated since Java 9, unreliable timing, replaced by AutoCloseable/try-with-resources and Cleaner.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'finally block.',
      codeSnippet: {
        language: 'java',
        code: `public class KeywordsDemo {
    public static void main(String[] args) {
        try {
            System.out.println(10 / 0);
        } finally {
            System.out.println("Always runs — cleanup here");
        }
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask what replaced finalize() in modern Java — try-with-resources and java.lang.ref.Cleaner.'
      }
    }
  },
  {
    id: 'java-q45',
    topicSlug: 'java',
    title: 'What is the static keyword? Can a static method access non-static members directly?',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: static binds a member to the class itself rather than an instance; a static method cannot directly access non-static members because there\'s no implicit \'this\'.',
      'Static fields exist exactly once per class.',
      'Static methods cannot use super/this and cannot be overridden (only hidden).'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Static scope.',
      codeSnippet: {
        language: 'java',
        code: `public class StaticDemo {
    static int counter = 0;
    int instanceId;

    static void printCounter() {
        System.out.println(counter); // OK
        // System.out.println(instanceId); // COMPILE ERROR
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask how a static method can access instance members — only via an explicit object reference passed in.'
      }
    }
  },
  {
    id: 'java-q46',
    topicSlug: 'java',
    title: 'What is a static block, and when is it executed?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: A static block (static { ... }) runs exactly once when the class is first initialized, before any instance is created or static method called.',
      'Execution order: static blocks → instance initializers → constructor body.',
      'If a static block throws an unchecked exception, the class fails to initialize (ExceptionInInitializerError).'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Static block timing.',
      codeSnippet: {
        language: 'java',
        code: `class InitOrderDemo {
    static { System.out.println("1: static block"); }
    { System.out.println("2: instance initializer"); }
    InitOrderDemo() { System.out.println("3: constructor"); }
    
    public static void main(String[] args) {
        new InitOrderDemo(); // prints 1, 2, 3
        new InitOrderDemo(); // prints 2, 3
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask what happens on a second instantiation — the static block does not re-run.'
      }
    }
  },
  {
    id: 'java-q47',
    topicSlug: 'java',
    title: 'What is the transient keyword, and how does it affect serialization?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: transient marks a field to be excluded from Java\'s default serialization process.',
      'Upon deserialization, transient fields are restored to their default value (null, 0, false).',
      'Common for sensitive data (passwords) or non-serializable dependencies (Threads, Sockets).',
      'Irrelevant for JSON serializers like Jackson/Gson which use their own annotations.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Transient keyword.',
      codeSnippet: {
        language: 'java',
        code: `import java.io.Serializable;
class UserSession implements Serializable {
    String username;
    transient String sessionToken; // excluded from serialized bytes
    UserSession(String u, String t) { username = u; sessionToken = t; }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask how to restore a transient field post-deserialization — implement readObject(ObjectInputStream in).'
      }
    }
  },
  {
    id: 'java-q48',
    topicSlug: 'java',
    title: 'What is the volatile keyword, and how does it relate to the Java Memory Model (JMM)?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: volatile guarantees reads/writes to a field go directly to main memory, ensuring visibility across threads, and preventing instruction reordering.',
      'Without volatile, a thread might cache a field in a CPU register and never observe another thread\'s update.',
      'volatile does NOT provide atomicity for compound operations like count++.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Volatile visibility.',
      codeSnippet: {
        language: 'java',
        code: `public class VolatileDemo {
    private static volatile boolean running = true; 
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {
            while (running) { /* busy loop */ }
        });
        worker.start();
        Thread.sleep(100);
        running = false; // guaranteed visible to worker promptly
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask "does volatile make count++ thread-safe?" — no, increment requires AtomicInteger or synchronized.'
      }
    }
  },
  {
    id: 'java-q49',
    topicSlug: 'java',
    title: 'What are wrapper classes, autoboxing, and unboxing?',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: Wrapper classes (Integer, Double) are object representations of primitives; autoboxing is automatic conversion from primitive to wrapper, and unboxing is the reverse.',
      'Needed because Java generics (List<T>) can\'t handle primitives directly.',
      'Unboxing a null wrapper throws NullPointerException.',
      'Autoboxing in loops carries performance overhead (object creation).'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Autoboxing and unboxing.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.*;
public class BoxingDemo {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
        list.add(5);          // autoboxing
        int x = list.get(0);  // unboxing
        
        Integer nullable = null;
        // int crash = nullable; // NPE at unboxing
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: Map<String, Integer> with map.get("missing") + 1 throws NPE because get() returns null, which fails unboxing.'
      }
    }
  },
  {
    id: 'java-q50',
    topicSlug: 'java',
    title: 'What is the Integer Cache mechanism?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: The JVM pre-creates and caches Integer objects for values from -128 to 127, so autoboxing within that range reuses shared instances.',
      'Values outside that range always create new, distinct Integer objects.',
      'Because of this, == comparisons may "accidentally" succeed for small integers but fail for large ones.',
      'Similar caching exists for Byte, Short, Long, Character, and Boolean.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Integer Cache.',
      codeSnippet: {
        language: 'java',
        code: `public class IntegerCacheDemo {
    public static void main(String[] args) {
        Integer a = 100, b = 100;
        System.out.println(a == b); // true — same cached instance

        Integer c = 200, d = 200;
        System.out.println(c == d); // false — distinct autoboxed objects

        System.out.println(c.equals(d)); // true — always use equals()
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: This is a common trap — always follow up by emphasizing .equals() must be used for wrapper comparison, never ==.'
      }
    }
  },
  {
    id: 'java-q51',
    topicSlug: 'java',
    title: 'What is the hierarchy of exceptions in Java (Throwable, Error, Exception)?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: Throwable is the root of all exception/error types, with two direct subclasses: Error (serious, typically unrecoverable JVM/system-level problems like OutOfMemoryError) and Exception (application-level conditions), which itself splits into checked exceptions and the unchecked RuntimeException subtree.',
      'Throwable -> Error (unchecked, unrecoverable)',
      'Throwable -> Exception -> RuntimeException (unchecked)',
      'Throwable -> Exception -> Other subclasses (checked)',
      'Error should generally never be caught/handled by application code — it signals conditions the JVM itself often can\'t recover from.',
      'Checked exceptions must be declared (throws) or caught — enforced at compile time.',
      'RuntimeException and Error are both "unchecked" — the compiler doesn\'t force handling.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Exception hierarchy.',
      codeSnippet: {
        language: 'java',
        code: `public class HierarchyDemo {
    public static void main(String[] args) {
        try {
            throw new IllegalStateException("unchecked example"); // RuntimeException subclass
        } catch (RuntimeException e) {
            System.out.println("Caught unchecked: " + e.getMessage());
        }
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask whether Error and RuntimeException are both "checked" — no, both are unchecked; only the branch of Exception excluding RuntimeException is checked.'
      }
    }
  },
  {
    id: 'java-q52',
    topicSlug: 'java',
    title: 'What is the difference between checked and unchecked (runtime) exceptions?',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: Checked exceptions represent recoverable conditions that the compiler forces the caller to either catch or declare via throws (e.g., IOException); unchecked exceptions (RuntimeException and its subclasses, plus Error) represent programming errors or unrecoverable conditions and are not enforced by the compiler.',
      'Checked exceptions are typically caused by external/environmental factors outside program logic control (file not found, network failure, SQL error).',
      'Unchecked exceptions typically indicate a programming bug (NullPointerException, ArrayIndexOutOfBoundsException, ClassCastException) that the developer should fix, not routinely catch.',
      'A method\'s throws clause is part of its public contract and participates in overriding rules (Q30).'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Checked vs Unchecked.',
      codeSnippet: {
        language: 'java',
        code: `import java.io.*;
public class CheckedUncheckedDemo {
    static void readFile() throws IOException { // checked — must be declared or caught
        new FileReader("missing.txt");
    }
    public static void main(String[] args) {
        int[] arr = new int[2];
        System.out.println(arr[5]); // unchecked — ArrayIndexOutOfBoundsException, no declaration needed
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask for the interviewer\'s opinion-style question — "should custom exceptions in a new project be checked or unchecked?" — modern consensus generally favors unchecked for business logic.'
      }
    }
  },
  {
    id: 'java-q53',
    topicSlug: 'java',
    title: 'What is the difference between throw and throws?',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: throw is a statement used to actually raise/instantiate an exception at a specific point in code; throws is a clause in a method signature declaring which checked exceptions that method might propagate to its caller, without itself raising anything.',
      'throw takes a single Throwable instance and immediately transfers control to the nearest matching catch block.',
      'throws is purely declarative — part of the compile-time contract, doesn\'t execute any runtime behavior.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'throw vs throws.',
      codeSnippet: {
        language: 'java',
        code: `import java.io.IOException;
public class ThrowThrowsDemo {
    static void risky() throws IOException, InterruptedException { // throws: declaration
        if (Math.random() < 0) throw new IOException("simulated"); // throw: actual raise
    }
    public static void main(String[] args) throws Exception {
        risky();
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask if throws is required for unchecked exceptions — no, it\'s entirely optional documentation for unchecked types.'
      }
    }
  },
  {
    id: 'java-q54',
    topicSlug: 'java',
    title: 'Can a try block exist without a catch block?',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: Yes — a try block can be paired with just a finally block (no catch at all), or in try-with-resources, with no catch/finally at all if the only goal is guaranteed resource closing.',
      'What\'s illegal is a bare try with neither catch, finally, nor resources.',
      'try { } finally { } is valid — used purely for guaranteed cleanup without exception handling logic.',
      'try (Resource r = ...) { } is valid on its own — the resource\'s close() is called automatically.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'try-finally without catch.',
      codeSnippet: {
        language: 'java',
        code: `public class TryNoCatchDemo {
    public static void main(String[] args) {
        try {
            System.out.println("Doing work");
        } finally {
            System.out.println("Cleanup — always runs, no catch needed here");
        }
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask what happens to an exception thrown inside a try-finally (no catch) block — it still propagates up the call stack after finally runs.'
      }
    }
  },
  {
    id: 'java-q55',
    topicSlug: 'java',
    title: 'In what scenarios will a finally block not execute?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: A finally block is skipped only in extreme scenarios: an explicit System.exit() call inside the try/catch, a JVM crash or forced kill, an infinite loop or deadlock inside the try block that never returns control, or a power failure.',
      'System.exit(int) terminates the JVM immediately, bypassing any pending finally blocks.',
      'Daemon thread termination when all non-daemon threads finish can also skip finally blocks mid-execution in that daemon thread.',
      'Under all "normal" circumstances — including return, break, continue, and thrown exceptions in the try/catch — finally is guaranteed to run.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'finally bypass.',
      codeSnippet: {
        language: 'java',
        code: `public class FinallySkipDemo {
    public static void main(String[] args) {
        try {
            System.out.println("try block");
            System.exit(0); // finally below will NOT run
        } finally {
            System.out.println("This will never print");
        }
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask "does finally run if the try block has a return statement?" — yes, finally still executes before the method actually returns.'
      }
    }
  },
  {
    id: 'java-q56',
    topicSlug: 'java',
    title: 'What happens if both try and finally blocks return a value?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: The value returned by the finally block silently overrides the value returned by the try (or catch) block.',
      'This is legal but considered extremely poor practice, since it can silently swallow both normal return values and in-flight exceptions.',
      'If finally contains a return statement, it unconditionally supersedes any pending return from try/catch, and even suppresses any exception that was about to propagate.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'finally return override.',
      codeSnippet: {
        language: 'java',
        code: `public class FinallyOverrideDemo {
    static int demo() {
        try {
            return 1;
        } finally {
            return 2; // overrides the try's return value — demo() returns 2, not 1
        }
    }
    public static void main(String[] args) {
        System.out.println(demo()); // prints 2
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: extend the example so try throws an exception instead of returning — a return in finally will silently swallow that exception entirely, a dangerous pattern.'
      }
    }
  },
  {
    id: 'java-q57',
    topicSlug: 'java',
    title: 'What is try-with-resources, and what interface must a resource implement?',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: Try-with-resources (Java 7+) is a try variant that automatically closes one or more resources declared in its parentheses, in reverse declaration order, once the block exits.',
      'Any resource used must implement java.lang.AutoCloseable (or its stricter subtype java.io.Closeable).',
      'Eliminates manual, error-prone finally { resource.close(); } boilerplate and null-checks.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'try-with-resources.',
      codeSnippet: {
        language: 'java',
        code: `import java.io.*;
public class TryWithResourcesDemo {
    public static void main(String[] args) {
        try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {
            System.out.println(br.readLine());
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        } // br.close() called automatically here, even if an exception occurred
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask what interface a custom class needs to implement to be usable in try-with-resources — AutoCloseable, with a single void close() throws Exception method.'
      }
    }
  },
  {
    id: 'java-q58',
    topicSlug: 'java',
    title: 'What are suppressed exceptions in try-with-resources?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: If both the try block body and a resource\'s close() method throw exceptions, the exception from the body is the one propagated to the caller, while the close()-time exception is attached to it as a "suppressed" exception (retrievable via getSuppressed()).',
      'Before Java 7, a close() exception in a manual finally block would completely mask/overwrite the original body exception.',
      'Throwable.addSuppressed(Throwable) and Throwable.getSuppressed() manage this relationship.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Suppressed exceptions.',
      codeSnippet: {
        language: 'java',
        code: `public class SuppressedDemo {
    static class BadResource implements AutoCloseable {
        @Override public void close() { throw new RuntimeException("close() failed"); }
    }
    public static void main(String[] args) {
        try (BadResource r = new BadResource()) {
            throw new IllegalStateException("body failed"); // this becomes the primary exception
        } catch (Exception e) {
            System.out.println("Primary: " + e.getMessage());
            for (Throwable s : e.getSuppressed()) {
                System.out.println("Suppressed: " + s.getMessage()); // "close() failed"
            }
        }
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask what happens if only close() throws (no exception in the body) — that exception becomes the primary, propagated exception directly; there\'s nothing to suppress it against.'
      }
    }
  },
  {
    id: 'java-q59',
    topicSlug: 'java',
    title: 'How does multi-catch syntax work, and what rule governs the inheritance hierarchy of caught types?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: Multi-catch (Java 7+, catch (TypeA | TypeB e)) lets a single catch block handle several unrelated exception types with shared handling logic.',
      'The rule is that none of the listed types may be a subclass of another in the same clause, since that would make the redundant subtype branch unreachable/ambiguous.',
      'The exception variable (e) in multi-catch is implicitly treated as effectively final and typed as the most specific common supertype of the listed alternatives.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Multi-catch syntax.',
      codeSnippet: {
        language: 'java',
        code: `public class MultiCatchDemo {
    static void process(int mode) throws Exception {
        if (mode == 1) throw new IllegalArgumentException("bad arg");
        if (mode == 2) throw new IllegalStateException("bad state");
    }
    public static void main(String[] args) {
        try {
            process(1);
        } catch (IllegalArgumentException | IllegalStateException e) { // multi-catch
            System.out.println("Handled: " + e.getMessage());
        }
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask why you can\'t re-assign the caught variable in a multi-catch block — it\'s implicitly final because the JVM needs a single, unambiguous static type for it across all listed alternatives.'
      }
    }
  },
  {
    id: 'java-q60',
    topicSlug: 'java',
    title: 'Can an exception thrown inside a catch block be caught by a sibling catch in the same block?',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: No — once control enters a specific catch block, that try-catch construct is considered "exited" for exception-matching purposes.',
      'An exception thrown from within a catch block propagates to an enclosing try (if any) or up the call stack, never to a sibling catch clause of the same statement.',
      'Each catch clause is evaluated top-to-bottom only once, against the original exception from the try block.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Exception in catch.',
      codeSnippet: {
        language: 'java',
        code: `public class CatchInsideCatchDemo {
    public static void main(String[] args) {
        try {
            try {
                throw new RuntimeException("original");
            } catch (RuntimeException e) {
                throw new IllegalStateException("from inside catch"); // NOT caught by sibling catches
            }
        } catch (IllegalStateException e) {
            System.out.println("Caught by OUTER try: " + e.getMessage());
        }
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: this question tests whether candidates understand that catch clauses aren\'t a "switch-like" dispatch across siblings.'
      }
    }
  },
  {
    id: 'java-q61',
    topicSlug: 'java',
    title: 'What is the difference between ClassNotFoundException and NoClassDefFoundError?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: ClassNotFoundException is a checked exception thrown when code explicitly tries to load a class by name at runtime (e.g., Class.forName(...)) and it can\'t be found.',
      'NoClassDefFoundError is an unchecked Error thrown by the JVM when a class that was successfully compiled against and available at compile time is missing from the classpath at runtime (often after previously being loaded and later becoming unavailable, or a static initializer failure).',
      'NoClassDefFoundError can also occur if a class\'s static initializer threw an exception during an earlier load attempt.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Class loading errors.',
      codeSnippet: {
        language: 'java',
        code: `public class ClassLoadingErrorsDemo {
    public static void main(String[] args) {
        try {
            Class.forName("com.example.MissingDriver"); // checked — explicit dynamic load
        } catch (ClassNotFoundException e) {
            System.out.println("ClassNotFoundException: " + e.getMessage());
        }
        // NoClassDefFoundError typically manifests only when a compiled dependency JAR
        // is missing from the runtime classpath — not directly triggerable inline here.
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask "if my code compiled fine, why would I get NoClassDefFoundError at runtime?" — usually a classpath mismatch between build time and deploy time, or a failed static initializer on a prior load attempt.'
      }
    }
  },
  {
    id: 'java-q62',
    topicSlug: 'java',
    title: 'How do you create a custom checked vs custom unchecked exception?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: Extend Exception (or one of its non-RuntimeException subclasses) to create a custom checked exception, forcing callers to catch or declare it.',
      'Extend RuntimeException (or one of its subclasses) to create a custom unchecked exception, which callers may handle optionally.',
      'Both should typically provide constructors mirroring the standard ones: no-arg, (String message), (String message, Throwable cause), and (Throwable cause) — for full exception-chaining support.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Custom exceptions.',
      codeSnippet: {
        language: 'java',
        code: `class InsufficientFundsException extends Exception { // custom checked
    InsufficientFundsException(String msg) { super(msg); }
}
class InvalidAmountException extends RuntimeException { // custom unchecked
    InvalidAmountException(String msg) { super(msg); }
}
class Account {
    double balance = 100;
    void withdraw(double amt) throws InsufficientFundsException {
        if (amt < 0) throw new InvalidAmountException("Amount cannot be negative"); // no throws needed
        if (amt > balance) throw new InsufficientFundsException("Not enough funds"); // must declare
        balance -= amt;
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask when a team should prefer custom checked over unchecked exceptions — generally when the caller has a genuine, actionable recovery path (e.g., prompting the user to add funds).'
      }
    }
  },
  {
    id: 'java-q63',
    topicSlug: 'java',
    title: 'What is exception chaining, and how do you pass a root cause?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: Exception chaining wraps a lower-level ("root cause") exception inside a higher-level, more meaningful exception using the Throwable(String message, Throwable cause) constructor (or .initCause(Throwable)).',
      'This preserves the original stack trace and cause information while presenting a more appropriate abstraction to the caller.',
      '.getCause() retrieves the wrapped original exception; printStackTrace() automatically prints the full "Caused by:" chain.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Exception chaining.',
      codeSnippet: {
        language: 'java',
        code: `class DataAccessException extends RuntimeException {
    DataAccessException(String msg, Throwable cause) { super(msg, cause); } // chains root cause
}
public class ChainingDemo {
    static void fetchUser() {
        try {
            throw new java.sql.SQLException("Connection timed out");
        } catch (java.sql.SQLException e) {
            throw new DataAccessException("Failed to fetch user", e); // wraps root cause
        }
    }
    public static void main(String[] args) {
        try {
            fetchUser();
        } catch (DataAccessException e) {
            System.out.println("Cause: " + e.getCause().getMessage()); // "Connection timed out"
        }
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask what happens if you don\'t chain the cause when re-throwing a translated exception — you silently lose the original stack trace, making production debugging significantly harder.'
      }
    }
  },
  {
    id: 'java-q64',
    topicSlug: 'java',
    title: 'Why should you avoid catching Throwable or Error directly?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: Catching Throwable or Error risks intercepting truly unrecoverable JVM-level conditions (like OutOfMemoryError or StackOverflowError), which the application generally cannot safely handle or continue from.',
      'Doing so can mask serious system failures, leave the JVM in an inconsistent state, or make debugging critical failures far harder.',
      'Error subclasses signal problems below the application layer — memory exhaustion, linkage failures, JVM internal issues.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Avoiding broad catches.',
      codeSnippet: {
        language: 'java',
        code: `public class BroadCatchDemo {
    public static void main(String[] args) {
        try {
            recurse(0);
        } catch (Exception e) { // reasonable: catches expected application-level issues
            System.out.println("Handled expected exception");
        }
        // catch (Throwable t) { } // AVOID — would also swallow StackOverflowError, OutOfMemoryError, etc.
    }
    static void recurse(int n) { recurse(n + 1); }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask for a legitimate exception to this rule — top-level "last line of defense" logging frameworks in some systems do catch Throwable deliberately, but only to log and then re-throw or terminate gracefully.'
      }
    }
  },
  {
    id: 'java-q65',
    topicSlug: 'java',
    title: 'What is the performance impact of creating and throwing exceptions frequently?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: Exception creation is relatively expensive primarily because of stack trace capture (fillInStackTrace(), which walks and records the entire call stack).',
      'Using exceptions for routine/expected control flow (instead of genuinely exceptional conditions) can meaningfully degrade performance in hot code paths.',
      'Throwable\'s constructor calls fillInStackTrace() by default, which is the dominant cost — proportional to stack depth.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Exception cost.',
      codeSnippet: {
        language: 'java',
        code: `public class ExceptionCostDemo {
    // Anti-pattern: using exceptions for expected, frequent control flow
    static boolean isValidBad(String s) {
        try { Integer.parseInt(s); return true; }
        catch (NumberFormatException e) { return false; } // expensive if called millions of times
    }
    // Better: pre-validate without relying on exception-driven control flow
    static boolean isValidGood(String s) {
        return s != null && s.chars().allMatch(Character::isDigit) && !s.isEmpty();
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask candidates to name the specific method responsible for the overhead — fillInStackTrace() — and how a custom exception could suppress it.'
      }
    }
  },
  {
    id: 'java-q66',
    topicSlug: 'java',
    title: 'Explain the hierarchy of the Java Collections Framework.',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: The framework is rooted in the Collection interface (for List, Set, Queue) and the separate Map interface (for key-value pairs, not a Collection subtype).',
      'List (ordered, duplicates allowed): ArrayList, LinkedList, Vector',
      'Set (no duplicates): HashSet, LinkedHashSet, TreeSet',
      'Queue/Deque: LinkedList, ArrayDeque, PriorityQueue',
      'Map (key-value, NOT a Collection): HashMap, LinkedHashMap, TreeMap, Hashtable'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Collections Hierarchy.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.*;
public class HierarchyDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(List.of("a", "b", "a")); // duplicates OK
        Set<String> set = new HashSet<>(list);                       // dedups to {a, b}
        Map<String, Integer> map = new HashMap<>();                  // key-value, not a Collection
        map.put("a", 1);
        System.out.println(list + " " + set + " " + map);
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask "is Map a subtype of Collection?" — no, a common misconception; it\'s a parallel, separate root interface in the framework.'
      }
    }
  },
  {
    id: 'java-q67',
    topicSlug: 'java',
    title: 'What is the difference between Collection and Collections?',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: Collection is the root interface of the collections type hierarchy (representing a group of objects); Collections (plural) is a utility class full of static helper methods (sorting, searching, synchronizing, creating immutable/empty collections) that operate on Collection/List/Map instances.',
      'Collection<E>: interface, extended by List, Set, Queue.',
      'Collections: final utility class in java.util, analogous to Arrays for arrays — cannot be instantiated (private constructor).'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Collection vs Collections.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.*;
public class CollectionVsCollectionsDemo {
    public static void main(String[] args) {
        Collection<Integer> nums = new ArrayList<>(List.of(3, 1, 2)); // Collection: the interface
        List<Integer> asList = new ArrayList<>(nums);
        Collections.sort(asList); // Collections: the utility class
        System.out.println(asList);
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: purely a naming/vocabulary check — interviewers use this to catch candidates who conflate the two due to the near-identical name.'
      }
    }
  },
  {
    id: 'java-q68',
    topicSlug: 'java',
    title: 'What are the differences between ArrayList and LinkedList in terms of memory and complexity?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: ArrayList is backed by a dynamically resizable array, giving O(1) indexed access but O(n) insertion/removal in the middle (due to shifting elements); LinkedList is a doubly-linked list, giving O(1) insertion/removal at known positions (given a node reference) but O(n) indexed access, plus higher per-element memory overhead from node pointers.',
      'ArrayList: get(index) is O(1), add(end) is O(1) amortized, add(middle) is O(n). Memory overhead is low.',
      'LinkedList: get(index) is O(n), add(end) is O(1), add(middle) is O(n) traversal + O(1) link update. Memory overhead is high (node pointers).'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'ArrayList vs LinkedList.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.*;
public class ListComparisonDemo {
    public static void main(String[] args) {
        List<Integer> arrayList = new ArrayList<>();
        List<Integer> linkedList = new LinkedList<>();
        for (int i = 0; i < 100_000; i++) { arrayList.add(i); linkedList.add(i); }
        long start = System.nanoTime();
        arrayList.get(50_000); // O(1)
        System.out.println("ArrayList get: " + (System.nanoTime() - start) + "ns");
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: many candidates assume LinkedList is always faster for insertions — but finding the insertion point still costs O(n) traversal unless you already hold an iterator/node reference.'
      }
    }
  },
  {
    id: 'java-q69',
    topicSlug: 'java',
    title: 'How does HashMap work internally (hashing, buckets, put/get mechanics)?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: HashMap stores entries in an internal array of buckets; a key\'s hashCode() is passed through an internal spreading function to compute a bucket index, and each bucket holds a linked list (or, since Java 8, a red-black tree for large buckets) of entries whose keys hash to that index, with .equals() used to find/verify the exact key on put/get.',
      'put(key, value): computes hash(key) -> determines bucket index via (n - 1) & hash (where n is table size, always a power of 2) -> traverses that bucket\'s chain.',
      'get(key): same hash + index computation -> scans the bucket, using .equals() to identify the matching entry.',
      'Table resizes ("rehash") when size exceeds capacity * loadFactor.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'HashMap mechanics.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.HashMap;
public class HashMapInternalsDemo {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("chennai", 1); // hash("chennai") -> bucket index -> new Node appended
        map.put("mumbai", 2);
        System.out.println(map.get("chennai")); // hash -> same bucket -> equals() match -> 1
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask candidates to explain why table size is always a power of 2 — it allows the fast bitmask (n - 1) & hash instead of a slower modulo % operation for bucket index computation.'
      }
    }
  },
  {
    id: 'java-q70',
    topicSlug: 'java',
    title: 'What changes were made to HashMap in Java 8 regarding treeification (TreeNode)?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: Java 8 introduced bucket treeification: when a single bucket\'s linked-list chain grows beyond a threshold (default 8 entries) and the overall table capacity is at least 64, that bucket converts into a self-balancing red-black tree (TreeNode).',
      'This improves worst-case lookup from O(n) to O(log n) within that bucket.',
      'The bucket reverts to a linked list if it shrinks below a threshold (default 6) during removals.',
      'Protects against adversarial hash-flooding attacks (many keys crafted to collide into the same bucket).'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Treeification concept.',
      codeSnippet: {
        language: 'java',
        code: `// Conceptual illustration — actual treeification is internal and not directly observable via public API.
import java.util.HashMap;
public class TreeifyDemo {
    public static void main(String[] args) {
        HashMap<Integer, String> map = new HashMap<>();
        for (int i = 0; i < 200; i++) map.put(i, "v" + i); // large map — internal buckets may treeify
        System.out.println(map.size());
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask why MIN_TREEIFY_CAPACITY exists as a guard — treeifying a small table is counterproductive; a resize (doubling capacity and redistributing) is cheaper and usually sufficient to fix crowding at small scale.'
      }
    }
  },
  {
    id: 'java-q71',
    topicSlug: 'java',
    title: 'What is the default initial capacity and load factor of a HashMap?',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: The default initial capacity is 16 buckets, and the default load factor is 0.75 — meaning the table resizes (doubles) once the number of entries exceeds 75% of capacity (i.e., at 12 entries for the default 16-bucket table).',
      'Load factor balances time-space trade-off: a lower factor reduces collisions (faster lookups) at the cost of more memory (more, sparser buckets).',
      'Capacity is always maintained as a power of 2.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'HashMap capacity.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.HashMap;
public class CapacityDemo {
    public static void main(String[] args) {
        HashMap<Integer, String> defaultMap = new HashMap<>();              // capacity 16, load factor 0.75
        HashMap<Integer, String> presized = new HashMap<>(200, 0.9f);       // custom capacity & load factor
        System.out.println("Defaults used unless explicitly overridden");
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask how to correctly pre-size a HashMap for exactly N known entries to avoid resizing — the common formula is capacity = (int) (N / loadFactor) + 1, rounded up to the next power of 2.'
      }
    }
  },
  {
    id: 'java-q72',
    topicSlug: 'java',
    title: 'Why are immutable objects (like String or Integer) preferred as keys in a HashMap?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: Immutable keys guarantee their hashCode() never changes after insertion — if a mutable key\'s fields (and thus its hash code) changed after being placed in a bucket, the entry would become "lost".',
      'HashMap computes a key\'s bucket location once, at insertion time, based on its hash code at that moment.',
      'Immutable keys sidestep this entirely since their state — and thus hash code — is fixed for their lifetime.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Mutable key bug.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.*;
class MutableKey {
    int id;
    MutableKey(int id) { this.id = id; }
    @Override public int hashCode() { return id; }
    @Override public boolean equals(Object o) { return o instanceof MutableKey && ((MutableKey) o).id == id; }
}
public class MutableKeyDemo {
    public static void main(String[] args) {
        Map<MutableKey, String> map = new HashMap<>();
        MutableKey key = new MutableKey(1);
        map.put(key, "value");
        key.id = 2; // mutate AFTER insertion — hashCode changes!
        System.out.println(map.get(key)); // null — entry is now "lost" in the wrong bucket
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: this is a great live-coding demo trap — have candidates predict the output before running it; many incorrectly expect "value".'
      }
    }
  },
  {
    id: 'java-q73',
    topicSlug: 'java',
    title: 'What is the difference between HashMap, HashTable, and ConcurrentHashMap?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: HashMap is unsynchronized and allows one null key plus multiple null values; Hashtable is a legacy, fully synchronized (method-level locking) class that disallows any null keys or values; ConcurrentHashMap is a modern thread-safe alternative using fine-grained internal locking/CAS operations for much higher concurrent throughput than Hashtable, and also disallows null keys/values.',
      'Hashtable is considered legacy — Collections.synchronizedMap(new HashMap<>()) or, better, ConcurrentHashMap are preferred in modern code.',
      'ConcurrentHashMap disallows null to avoid ambiguity in concurrent reads.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Map comparison.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.concurrent.ConcurrentHashMap;
import java.util.Hashtable;
public class MapComparisonDemo {
    public static void main(String[] args) {
        ConcurrentHashMap<String, String> cmap = new ConcurrentHashMap<>();
        cmap.put("key", "value"); // thread-safe, high concurrency
        // cmap.put(null, "x"); // throws NullPointerException
        Hashtable<String, String> legacy = new Hashtable<>(); // rarely used in modern code
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask "why doesn\'t ConcurrentHashMap allow null values?" — because map.get(key) == null would be ambiguous between "key not present" and "key present, value is null" in a concurrent context.'
      }
    }
  },
  {
    id: 'java-q74',
    topicSlug: 'java',
    title: 'How does ConcurrentHashMap achieve thread safety without locking the entire map?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: Modern ConcurrentHashMap (Java 8+) uses fine-grained synchronization at the individual bucket/node level combined with lock-free CAS (compare-and-swap) operations for common paths.',
      'Reads (get()) are largely lock-free, relying on volatile-backed fields for visibility.',
      'Writes (put()) use CAS to insert into an empty bucket without locking; only when appending to an existing (non-empty) bucket does it synchronize on that bucket\'s first node.',
      'Resizing is done cooperatively — multiple threads can help transfer entries to the new table concurrently.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'ConcurrentHashMap Internals.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.concurrent.ConcurrentHashMap;
public class CHMInternalsDemo {
    public static void main(String[] args) throws InterruptedException {
        ConcurrentHashMap<Integer, Integer> map = new ConcurrentHashMap<>();
        Runnable task = () -> { for (int i = 0; i < 1000; i++) map.merge(i % 10, 1, Integer::sum); };
        Thread t1 = new Thread(task), t2 = new Thread(task);
        t1.start(); t2.start();
        t1.join(); t2.join();
        System.out.println(map); // consistent, thread-safe aggregated results
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask candidates to contrast this with the pre-Java-8 "segment" locking design (16 segments, each independently locked) — the Java 8 rewrite moved to per-bucket granularity for even finer concurrency.'
      }
    }
  },
  {
    id: 'java-q75',
    topicSlug: 'java',
    title: 'What is the difference between HashSet, LinkedHashSet, and TreeSet?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: HashSet offers no ordering guarantee and O(1) average operations, backed internally by a HashMap; LinkedHashSet preserves insertion order via an internal doubly-linked list layered atop hashing, at a small memory/performance cost; TreeSet maintains elements in sorted order (natural ordering or a custom Comparator), backed by a red-black tree (TreeMap internally), giving O(log n) operations.',
      'HashSet: no order, one null allowed.',
      'LinkedHashSet: insertion order, one null allowed.',
      'TreeSet: sorted order, no null elements (throws NPE).'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Set implementations.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.*;
public class SetComparisonDemo {
    public static void main(String[] args) {
        Set<String> hash = new HashSet<>(List.of("c", "a", "b"));
        Set<String> linked = new LinkedHashSet<>(List.of("c", "a", "b"));
        Set<String> tree = new TreeSet<>(List.of("c", "a", "b"));
        System.out.println(hash);   // unpredictable order
        System.out.println(linked); // [c, a, b] — insertion order preserved
        System.out.println(tree);   // [a, b, c] — sorted order
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask what exception new TreeSet<>().add(null) throws when using natural ordering — NullPointerException, since compareTo() can\'t be invoked against null.'
      }
    }
  },
  {
    id: 'java-q76',
    topicSlug: 'java',
    title: 'What is the difference between Comparable and Comparator?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: Comparable (via compareTo()) defines a class\'s single, natural/default ordering, implemented by the class itself; Comparator (via compare()) is a separate, standalone strategy object that defines an arbitrary, possibly multiple, external ordering(s) for a class without modifying it.',
      'Comparable<T>: single method int compareTo(T other).',
      'Comparator<T>: single method int compare(T a, T b).',
      'Java 8 added rich Comparator composition: Comparator.comparing(...), .thenComparing(...), .reversed().'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Comparable and Comparator.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.*;
class Employee implements Comparable<Employee> {
    String name; int age;
    Employee(String name, int age) { this.name = name; this.age = age; }
    @Override public int compareTo(Employee o) { return Integer.compare(this.age, o.age); } // natural order: by age
    @Override public String toString() { return name + "(" + age + ")"; }
}
public class ComparableComparatorDemo {
    public static void main(String[] args) {
        List<Employee> list = new ArrayList<>(List.of(new Employee("A", 30), new Employee("B", 25)));
        Collections.sort(list); // uses Comparable (natural order: age)
        list.sort(Comparator.comparing((Employee e) -> e.name)); // uses Comparator: by name instead
        System.out.println(list);
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask how to sort by multiple fields (e.g., age then name) — Comparator.comparing(Employee::age).thenComparing(Employee::name) is the expected idiomatic Java 8+ answer.'
      }
    }
  },
  {
    id: 'java-q77',
    topicSlug: 'java',
    title: 'What is the fail-fast versus fail-safe iterator mechanism?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: Fail-fast iterators throw a ConcurrentModificationException if the underlying collection is structurally modified while iterating; fail-safe iterators iterate over a snapshot or tolerate concurrent modification without throwing.',
      'Fail-fast detection uses an internal modCount field, incremented on every structural modification.',
      'Fail-safe collections like CopyOnWriteArrayList create a fresh copy of the underlying array on every mutation.',
      'ConcurrentHashMap\'s iterators are weakly consistent — they reflect some state of the map during iteration, but never throw ConcurrentModificationException.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Fail-fast and fail-safe iterators.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;
public class IteratorDemo {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(List.of(1, 2, 3));
        try {
            for (Integer i : list) list.add(4); // fail-fast: ConcurrentModificationException
        } catch (ConcurrentModificationException e) {
            System.out.println("Caught fail-fast exception");
        }
        List<Integer> safeList = new CopyOnWriteArrayList<>(List.of(1, 2, 3));
        for (Integer i : safeList) safeList.add(4); // fail-safe: no exception, iterates original snapshot
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask why list.remove(item) inside a normal for-each loop still throws ConcurrentModificationException while iterator.remove() doesn\'t — only the iterator\'s own remove() method properly updates modCount.'
      }
    }
  },
  {
    id: 'java-q78',
    topicSlug: 'java',
    title: 'What is type erasure in Java Generics?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: Type erasure is the compile-time process by which Java generics\' type parameters are removed ("erased") from the bytecode after compilation — replaced with their bound (or Object if unbounded).',
      'List<String> and List<Integer> both compile down to the same raw List bytecode.',
      'The compiler inserts implicit casts at the call sites where generic values are used, preserving type safety without runtime generic type checks.',
      'Consequently, you cannot create a generic array, and cannot use instanceof with a parameterized type.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Type erasure effects.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.*;
public class ErasureDemo {
    public static void main(String[] args) {
        List<String> strList = new ArrayList<>();
        List<Integer> intList = new ArrayList<>();
        System.out.println(strList.getClass() == intList.getClass()); // true — same erased class: ArrayList
        // if (strList instanceof List<String>) {} // COMPILE ERROR — generic type info erased at runtime
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask "so how does ArrayList<String>.get() return a String without a runtime cast being visible?" — the compiler inserts an implicit (String) cast at the call site during compilation; it\'s invisible in source but present in bytecode.'
      }
    }
  },
  {
    id: 'java-q79',
    topicSlug: 'java',
    title: 'What is the difference between <? extends T> (upper bounded) and <? super T> (lower bounded) wildcards?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: <? extends T> restricts a generic type to T or any of its subtypes, making the structure safe to read from (as T) but unsafe to write to (except null); <? super T> restricts it to T or any of its supertypes, making it safe to write T instances into, but reads only yield Object-typed values.',
      'List<? extends Number>: could actually be a List<Integer> or List<Double> at runtime — writes are disallowed (compile error), but reading elements as Number is always safe.',
      'List<? super Integer>: could be List<Integer>, List<Number>, or List<Object> — adding an Integer is always safe, but reading only guarantees an Object back.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Bounded wildcards.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.*;
public class WildcardDemo {
    static double sumNumbers(List<? extends Number> list) { // upper bound: safe to READ as Number
        double sum = 0;
        for (Number n : list) sum += n.doubleValue();
        // list.add(5); // COMPILE ERROR — can't safely write, actual list type unknown
        return sum;
    }
    static void addIntegers(List<? super Integer> list) { // lower bound: safe to WRITE Integer
        list.add(1); list.add(2);
        // Integer x = list.get(0); // COMPILE ERROR — only guaranteed Object on read
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask which wildcard to use for a method that both reads and writes the same generic type — neither wildcard is ideal; use an exact/invariant type parameter (List<T>) instead when both operations are required.'
      }
    }
  },
  {
    id: 'java-q80',
    topicSlug: 'java',
    title: 'What is the PECS principle (Producer Extends, Consumer Super)?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: PECS is a mnemonic guiding wildcard choice: if a generic structure only produces (you read from it), use <? extends T>; if it only consumes (you write into it), use <? super T>; if it does both, use the exact invariant type T with no wildcard.',
      '"Producer" refers to the collection\'s role from the method\'s perspective — it\'s producing values to your code (so use extends).',
      '"Consumer" refers to the collection accepting values from your code (so use super).'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'PECS in action.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.*;
public class PECSDemo {
    // src PRODUCES elements (read) -> extends; dest CONSUMES elements (write) -> super
    static <T> void copyAll(List<? super T> dest, List<? extends T> src) {
        for (T item : src) dest.add(item);
    }
    public static void main(String[] args) {
        List<Integer> ints = List.of(1, 2, 3);
        List<Number> numbers = new ArrayList<>();
        copyAll(numbers, ints); // Integer producer -> Number consumer, fully type-safe
        System.out.println(numbers);
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: reference the JDK\'s own Collections.copy() signature and ask candidates to explain, parameter by parameter, why each wildcard direction was chosen — a strong signal of genuine PECS understanding.'
      }
    }
  },
  {
    id: 'java-q81',
    topicSlug: 'java',
    title: 'What are the different ways to create a thread in Java?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: The two classic approaches are extending Thread and overriding run(), or implementing Runnable and passing it to a Thread; modern approaches include implementing Callable, submitting lambdas directly to an ExecutorService, and, since Java 21, spawning lightweight virtual threads.',
      'Extend Thread: simplest but wastes Java\'s single-inheritance slot and tightly couples task logic to thread management.',
      'Implement Runnable: preferred — decouples the task from the thread mechanism.',
      'ExecutorService: the modern, recommended abstraction — manages a thread pool.',
      'Virtual threads (Java 21+): Thread.ofVirtual().start(runnable) — extremely lightweight JVM-managed threads.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Creating threads.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.concurrent.*;
public class ThreadCreationDemo {
    public static void main(String[] args) throws Exception {
        Runnable r = () -> System.out.println("Runnable running on: " + Thread.currentThread().getName());
        new Thread(r).start(); // classic approach

        ExecutorService pool = Executors.newFixedThreadPool(2);
        Future<Integer> future = pool.submit(() -> 42); // Callable, returns a value
        System.out.println("Callable result: " + future.get());
        pool.shutdown();
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask why implements Runnable is generally preferred over extends Thread — separation of concerns (task vs execution mechanism).'
      }
    }
  },
  {
    id: 'java-q82',
    topicSlug: 'java',
    title: 'What is the difference between implementing Runnable and extending Thread?',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: Implementing Runnable separates the task\'s logic from the thread-management mechanism, allowing the class to still extend another class and letting the same task instance be reused across multiple threads or an executor pool.',
      'Extending Thread tightly couples the task to being a thread itself, using up Java\'s single inheritance slot.',
      'Thread itself implements Runnable — extending Thread and overriding run() is really just a specialized case of the Runnable pattern, baked directly into a thread subclass.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Runnable vs Thread.',
      codeSnippet: {
        language: 'java',
        code: `class Task implements Runnable {          // preferred: composable, reusable task
    @Override public void run() { System.out.println("Task executing"); }
}
class WorkerThread extends Thread {       // less flexible: task IS a thread
    @Override public void run() { System.out.println("WorkerThread executing"); }
}
public class RunnableVsThreadDemo {
    public static void main(String[] args) {
        Runnable task = new Task();
        new Thread(task).start(); // task reusable across multiple Thread instances if needed
        new WorkerThread().start();
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask "what happens if you call .run() directly instead of .start()?" — run() executes synchronously on the calling thread, no new thread is spawned.'
      }
    }
  },
  {
    id: 'java-q83',
    topicSlug: 'java',
    title: 'What is the difference between Callable and Runnable?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: Runnable.run() returns no value and cannot throw checked exceptions; Callable<V>.call() returns a typed result V and can throw checked exceptions.',
      'Callable is designed for use with ExecutorService, whose submit() returns a Future<V> representing the pending result.',
      'Future.get() blocks until the result is available, and re-throws any exception from call() wrapped in an ExecutionException.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Callable vs Runnable.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.concurrent.*;
public class CallableDemo {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newSingleThreadExecutor();
        Callable<Integer> task = () -> { // can return a value and throw checked exceptions
            if (Math.random() < 0) throw new Exception("simulated failure");
            return 21 * 2;
        };
        Future<Integer> future = pool.submit(task);
        System.out.println("Result: " + future.get()); // blocks until computed
        pool.shutdown();
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask how to retrieve an exception thrown inside a Callable — it\'s caught by Future.get(), which throws ExecutionException wrapping the original cause, retrievable via .getCause().'
      }
    }
  },
  {
    id: 'java-q84',
    topicSlug: 'java',
    title: 'Explain the lifecycle states of a thread in Java (Thread.State).',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: A Java thread moves through the states NEW, RUNNABLE, BLOCKED, WAITING/TIMED_WAITING, and finally TERMINATED.',
      'NEW: after new Thread(), before .start().',
      'RUNNABLE: after .start() — includes both actually running on a CPU core and merely being ready/scheduled.',
      'BLOCKED: waiting to enter a synchronized block/method because another thread holds the lock.',
      'WAITING/TIMED_WAITING: via wait(), join(), sleep() — waiting indefinitely or for a bounded time.',
      'TERMINATED: run() completed.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Thread states.',
      codeSnippet: {
        language: 'java',
        code: `public class ThreadStateDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> {
            try { Thread.sleep(200); } catch (InterruptedException ignored) { }
        });
        System.out.println(t.getState()); // NEW
        t.start();
        System.out.println(t.getState()); // RUNNABLE (likely)
        Thread.sleep(50);
        System.out.println(t.getState()); // TIMED_WAITING (inside sleep)
        t.join();
        System.out.println(t.getState()); // TERMINATED
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask if RUNNABLE guarantees the thread is actively executing on a CPU core right now — no, it just means it\'s eligible for CPU scheduling.'
      }
    }
  },
  {
    id: 'java-q85',
    topicSlug: 'java',
    title: 'What is the difference between wait(), notify(), sleep(), and yield()?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: wait()/notify() release a held monitor lock and coordinate inter-thread communication, requiring synchronized context.',
      'Thread.sleep() pauses the current thread for a fixed duration without releasing any locks it holds.',
      'Thread.yield() is a scheduling hint suggesting the current thread is willing to let other equal-priority threads run, with no guarantee of effect.',
      'wait() must be called inside a loop checking the condition to guard against spurious wakeups.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Wait and Notify.',
      codeSnippet: {
        language: 'java',
        code: `public class WaitNotifyDemo {
    static final Object lock = new Object();
    static boolean ready = false;
    public static void main(String[] args) throws InterruptedException {
        Thread waiter = new Thread(() -> {
            synchronized (lock) {
                while (!ready) {
                    try { lock.wait(); } catch (InterruptedException ignored) { } // releases lock while waiting
                }
                System.out.println("Condition met, proceeding");
            }
        });
        waiter.start();
        Thread.sleep(100);
        synchronized (lock) {
            ready = true;
            lock.notify(); // wakes the waiting thread
        }
        waiter.join();
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask why wait()/notify() are defined on Object rather than Thread — because any object can serve as a monitor lock in Java\'s synchronized model.'
      }
    }
  },
  {
    id: 'java-q86',
    topicSlug: 'java',
    title: 'Why are wait(), notify(), and notifyAll() defined in Object rather than Thread?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: Because every Java object (not just Thread instances) can serve as an intrinsic lock/monitor via synchronized, and wait()/notify() operate on that specific object\'s internal "wait set".',
      'Placing wait()/notify() on Thread would be conceptually wrong, since it\'s the lock object, not any particular thread, that maintains the set of threads waiting on it.',
      'This design allows flexible, fine-grained locking strategies where different objects act as independent synchronization points.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Monitor on Object.',
      codeSnippet: {
        language: 'java',
        code: `public class ObjectMonitorDemo {
    private final Object monitor = new Object(); // any object can be a monitor
    void doWork() {
        synchronized (monitor) {
            try { monitor.wait(100); } catch (InterruptedException ignored) { } // wait() lives on Object
        }
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask what exception is thrown if wait() is called outside a synchronized block on that object — IllegalMonitorStateException.'
      }
    }
  },
  {
    id: 'java-q87',
    topicSlug: 'java',
    title: 'What is a race condition, and what is a deadlock? How can you detect or prevent deadlocks?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: A race condition occurs when multiple threads access and modify shared mutable state concurrently without proper synchronization, producing unpredictable results.',
      'A deadlock occurs when two or more threads are each waiting indefinitely for a lock held by another thread in the group, forming a circular wait.',
      'Prevention strategies: always acquire multiple locks in a globally consistent order; use tryLock(timeout); minimize nested lock scope.',
      'Detection: thread dumps (jstack) reveal deadlocked threads explicitly; ThreadMXBean.findDeadlockedThreads() can detect them programmatically.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Deadlock illustration.',
      codeSnippet: {
        language: 'java',
        code: `public class DeadlockDemo {
    static final Object lockA = new Object(), lockB = new Object();
    public static void main(String[] args) {
        Thread t1 = new Thread(() -> {
            synchronized (lockA) {
                try { Thread.sleep(50); } catch (InterruptedException ignored) { }
                synchronized (lockB) { System.out.println("t1 acquired both"); } // waits for lockB
            }
        });
        Thread t2 = new Thread(() -> {
            synchronized (lockB) { // opposite order -> classic deadlock setup
                synchronized (lockA) { System.out.println("t2 acquired both"); }
            }
        });
        t1.start(); t2.start(); // deadlock: t1 holds A waiting for B, t2 holds B waiting for A
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask candidates to fix the deadlock in the code above — the standard fix is enforcing a consistent global lock acquisition order (both threads always lock lockA before lockB).'
      }
    }
  },
  {
    id: 'java-q88',
    topicSlug: 'java',
    title: 'What is the synchronized keyword, and how does intrinsic lock (monitor) reentrancy work?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: synchronized ensures mutual exclusion — only one thread can execute a synchronized block/method on a given object at a time.',
      'Reentrancy means the same thread that already holds a lock can re-acquire it without blocking itself, tracked via an internal hold count.',
      'Without reentrancy, a synchronized method calling another synchronized method on the same object would self-deadlock.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Reentrancy demo.',
      codeSnippet: {
        language: 'java',
        code: `public class ReentrancyDemo {
    synchronized void outer() {
        System.out.println("In outer, calling inner...");
        inner(); // same thread re-acquires the same lock — no self-deadlock
    }
    synchronized void inner() {
        System.out.println("In inner — reentrant lock acquisition succeeded");
    }
    public static void main(String[] args) {
        new ReentrancyDemo().outer();
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask what would happen without reentrancy — the calling thread would block forever waiting for a lock it already holds, effectively self-deadlocking.'
      }
    }
  },
  {
    id: 'java-q89',
    topicSlug: 'java',
    title: 'What is the difference between synchronized blocks and synchronized methods?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: A synchronized method locks the entire method body on an implicit target (this for instance methods, the Class object for static methods).',
      'A synchronized block lets you lock only a specific critical section on an explicitly chosen object, offering finer-grained control and reducing the scope (and thus contention) of the held lock.',
      'Best practice: prefer a private final lock object for block synchronization, rather than this, to fully encapsulate the locking strategy from external interference.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Block vs Method.',
      codeSnippet: {
        language: 'java',
        code: `public class SyncBlockVsMethodDemo {
    private final Object lock = new Object(); // private lock — fully encapsulated
    private int counter = 0;

    public synchronized void incrementWholeMethod() { counter++; } // locks entire method on 'this'

    public void incrementCriticalSectionOnly() {
        System.out.println("Non-critical setup work here, unsynchronized");
        synchronized (lock) { counter++; } // only this small section is locked
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask why locking on this can be risky in a public API — external code can also synchronize on the same object instance, potentially causing unintended contention or deadlocks.'
      }
    }
  },
  {
    id: 'java-q90',
    topicSlug: 'java',
    title: 'What is ExecutorService, and how do thread pools prevent thread-creation overhead?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: ExecutorService is a high-level concurrency abstraction that manages a pool of reusable worker threads.',
      'It lets you submit tasks (Runnable/Callable) for execution without manually creating, starting, and tearing down threads for each task.',
      'Pooling amortizes the relatively expensive OS-level cost of thread creation/destruction across many task executions.',
      'Common factory methods: Executors.newFixedThreadPool(n), newCachedThreadPool(), etc.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Using ExecutorService.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.concurrent.*;
public class ExecutorServiceDemo {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService pool = Executors.newFixedThreadPool(4); // 4 reusable worker threads
        for (int i = 0; i < 10; i++) {
            int taskId = i;
            pool.submit(() -> System.out.println("Task " + taskId + " on " + Thread.currentThread().getName()));
        }
        pool.shutdown();
        pool.awaitTermination(5, TimeUnit.SECONDS); // wait for graceful completion
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask why Executors.newFixedThreadPool() are now often discouraged in production — their default unbounded task queues can lead to OutOfMemoryError under load; explicitly configuring a ThreadPoolExecutor is recommended.'
      }
    }
  },
  {
    id: 'java-q91',
    topicSlug: 'java',
    title: 'What is a Functional Interface, and what is the purpose of @FunctionalInterface?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: A functional interface is an interface with exactly one abstract method (a "Single Abstract Method" or SAM type), making it a valid target for a lambda expression.',
      '@FunctionalInterface is an optional but recommended annotation that instructs the compiler to enforce this single-abstract-method constraint, failing the build if violated.',
      'A functional interface can still contain any number of default and static methods.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Functional Interface.',
      codeSnippet: {
        language: 'java',
        code: `@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);           // the single abstract method
    default void describe() { System.out.println("A calculator"); } // allowed: default method
}
public class FunctionalInterfaceDemo {
    public static void main(String[] args) {
        Calculator add = (a, b) -> a + b; // lambda targets the SAM
        System.out.println(add.calculate(3, 4));
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask what happens if you add a second abstract method to a @FunctionalInterface-annotated interface — a compile-time error, since the annotation actively enforces the SAM constraint.'
      }
    }
  },
  {
    id: 'java-q92',
    topicSlug: 'java',
    title: 'Explain the four core functional interface categories: Predicate, Function, Consumer, and Supplier.',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: Predicate<T> takes a T and returns a boolean (a test); Function<T,R> takes a T and returns an R (a transformation); Consumer<T> takes a T and returns nothing (a side-effecting action); Supplier<T> takes nothing and returns a T (a lazy value producer).',
      'Predicate: test(T)',
      'Function: apply(T)',
      'Consumer: accept(T)',
      'Supplier: get()'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Core functional interfaces.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.function.*;
public class FunctionalCategoriesDemo {
    public static void main(String[] args) {
        Predicate<Integer> isEven = n -> n % 2 == 0;
        Function<Integer, Integer> square = n -> n * n;
        Consumer<Integer> print = n -> System.out.println("Value: " + n);
        Supplier<Integer> randomSeed = () -> 42;

        int val = randomSeed.get();
        if (isEven.test(val)) print.accept(square.apply(val)); // composed usage
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask candidates to chain Function.andThen() vs .compose() and predict execution order — f.andThen(g) applies f first then g; f.compose(g) applies g first then f.'
      }
    }
  },
  {
    id: 'java-q93',
    topicSlug: 'java',
    title: 'What is a Lambda Expression, and how does variable capturing work (effectively final)?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: A lambda expression is a concise, anonymous implementation of a functional interface\'s single abstract method, expressed as (params) -> body.',
      'It can "capture" local variables from its enclosing scope, but only if those variables are "effectively final" (never reassigned after initialization), since the lambda\'s execution may outlive the enclosing method\'s stack frame.',
      'Lambdas are compiled using the invokedynamic bytecode instruction, generating the implementing class lazily at runtime.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Lambda variable capture.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.function.Supplier;
public class LambdaCaptureDemo {
    public static void main(String[] args) {
        int base = 10; // effectively final — never reassigned after this point
        Supplier<Integer> addTen = () -> base + 5; // captures 'base' by value
        System.out.println(addTen.get());
        // base = 20; // if uncommented, compile error: base is no longer effectively final
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask why lambdas can\'t capture non-effectively-final locals — because the lambda instance can be invoked later, so the JVM must snapshot the value rather than reference a live stack slot.'
      }
    }
  },
  {
    id: 'java-q94',
    topicSlug: 'java',
    title: 'What is method reference syntax (::), and what are its four types?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: Method references (::) are shorthand syntax for a lambda that simply delegates to an existing method.',
      'The four types are: static method reference (ClassName::staticMethod), bound instance method reference (instance::method), unbound instance method reference (ClassName::instanceMethod), and constructor reference (ClassName::new).'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Method References.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.*;
import java.util.function.*;
public class MethodReferenceDemo {
    public static void main(String[] args) {
        Function<String, Integer> parse = Integer::parseInt;      // static
        List<String> list = new ArrayList<>();
        Consumer<String> add = list::add;                          // bound instance
        Function<String, String> upper = String::toUpperCase;      // unbound instance
        Supplier<List<String>> factory = ArrayList::new;            // constructor reference

        add.accept("hi");
        System.out.println(parse.apply("42") + " " + upper.apply("chennai") + " " + factory.get());
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: give String::toUpperCase used in a BiFunction<String, String, String> context and ask why it wouldn\'t compile — an unbound instance reference only supplies one implicit parameter (the receiver).'
      }
    }
  },
  {
    id: 'java-q95',
    topicSlug: 'java',
    title: 'What is the Stream API, and what is the difference between intermediate and terminal operations?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: The Stream API (Java 8+) provides a declarative, functional-style pipeline for processing sequences of elements.',
      'Intermediate operations (filter, map, sorted) are lazy and return a new Stream, only executing when a terminal operation (collect, forEach, reduce) is invoked.',
      'The terminal operation triggers the entire pipeline and produces a final result or side effect.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Stream API pipeline.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.*;
import java.util.stream.*;
public class StreamDemo {
    public static void main(String[] args) {
        List<String> names = List.of("Rishi", "Anu", "Bob", "Ravi");
        List<String> result = names.stream()
            .filter(n -> n.length() > 3)   // intermediate — lazy
            .map(String::toUpperCase)      // intermediate — lazy
            .sorted()                       // intermediate — lazy
            .collect(Collectors.toList());  // terminal — triggers execution
        System.out.println(result);
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask "if I chain 5 filter/map calls but never add a terminal operation, does any processing happen?" — no, absolutely nothing executes; the entire pipeline is a no-op description until a terminal operation is invoked.'
      }
    }
  },
  {
    id: 'java-q96',
    topicSlug: 'java',
    title: 'What is the difference between map() and flatMap() in the Stream API?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: map() transforms each element into exactly one new element (a one-to-one mapping), producing a Stream<R>.',
      'flatMap() transforms each element into a stream of elements and then flattens all those inner streams into a single, combined output stream (a one-to-many mapping followed by flattening).',
      'Classic use case: given a List<List<Integer>>, flatMap() gives you a genuinely flattened Stream<Integer>.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'map vs flatMap.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.*;
import java.util.stream.*;
public class MapFlatMapDemo {
    public static void main(String[] args) {
        List<List<Integer>> nested = List.of(List.of(1, 2), List.of(3, 4), List.of(5));

        List<List<Integer>> mapped = nested.stream()
            .map(list -> list) // one-to-one — still nested lists
            .collect(Collectors.toList());

        List<Integer> flattened = nested.stream()
            .flatMap(List::stream) // one-to-many, then flattened
            .collect(Collectors.toList());

        System.out.println(mapped);    // [[1, 2], [3, 4], [5]]
        System.out.println(flattened); // [1, 2, 3, 4, 5]
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask for a real-world flatMap example beyond flattening nested lists — e.g., splitting a List<String> of sentences into a flat Stream<String> of individual words.'
      }
    }
  },
  {
    id: 'java-q97',
    topicSlug: 'java',
    title: 'How does the Optional class prevent NullPointerException, and what are its anti-patterns?',
    difficulty: 'Intermediate',
    theoreticalAnswer: [
      'Quick Answer: Optional<T> is a container object that explicitly represents "a value that may or may not be present," forcing callers to handle the absent case deliberately.',
      'Common anti-patterns include calling .get() without checking presence first, using Optional as a field or method parameter type, and wrapping every nullable value reflexively.',
      'Optional was designed primarily as a return type signal for library/API method results.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Optional usage.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.*;
public class OptionalDemo {
    static Optional<String> findUser(int id) {
        return id == 1 ? Optional.of("Rishi") : Optional.empty();
    }
    public static void main(String[] args) {
        String name = findUser(2)
            .map(String::toUpperCase)
            .orElse("UNKNOWN"); // safe, explicit fallback — no NPE risk
        System.out.println(name);

        // Anti-pattern to avoid:
        // String bad = findUser(2).get(); // throws NoSuchElementException if absent
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask "should every nullable field in a class be wrapped in Optional?" — no; the JDK team explicitly recommend against Optional fields/parameters — its intended use is almost exclusively as a return type.'
      }
    }
  },
  {
    id: 'java-q98',
    topicSlug: 'java',
    title: 'What are Records (introduced in Java 16), and how do they differ from regular classes?',
    difficulty: 'Beginner',
    theoreticalAnswer: [
      'Quick Answer: Records are a concise syntax for declaring immutable data-carrier classes — the compiler automatically generates a canonical constructor, private final fields, public accessor methods, plus equals(), hashCode(), and toString().',
      'All record fields are implicitly private final — records are immutable by design.',
      'Accessor methods are named exactly after the component (e.g., x(), not getX()).',
      'Records implicitly extend java.lang.Record and are implicitly final.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Java Records.',
      codeSnippet: {
        language: 'java',
        code: `record Point(int x, int y) {
    Point { // compact canonical constructor — for validation
        if (x < 0 || y < 0) throw new IllegalArgumentException("Coordinates must be non-negative");
    }
    double distanceFromOrigin() { return Math.sqrt(x * x + y * y); } // extra methods allowed
}
public class RecordDemo {
    public static void main(String[] args) {
        Point p = new Point(3, 4);
        System.out.println(p);                    // Point[x=3, y=4] — auto-generated toString()
        System.out.println(p.x() + " " + p.y());   // accessor methods, not getX()/getY()
        System.out.println(p.distanceFromOrigin());
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask if a record can have additional instance fields beyond its declared components — no, only the components form the state.'
      }
    }
  },
  {
    id: 'java-q99',
    topicSlug: 'java',
    title: 'What are Sealed Classes and Interfaces (Java 17), and how do they restrict inheritance?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: Sealed classes/interfaces (sealed ... permits) let a type explicitly declare the finite, closed set of classes allowed to extend or implement it.',
      'Every permitted subclass must itself be declared final, sealed, or non-sealed, giving the compiler (and switch expressions) exhaustive knowledge of all possible subtypes.',
      'Enables exhaustive pattern matching in switch expressions without needing a default branch.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Sealed classes.',
      codeSnippet: {
        language: 'java',
        code: `sealed interface Shape permits Circle, Square, Triangle {}
record Circle(double radius) implements Shape {}
record Square(double side) implements Shape {}
final class Triangle implements Shape { double base, height; }

public class SealedDemo {
    static double area(Shape s) {
        return switch (s) { // exhaustive — no default needed, compiler verifies all cases covered
            case Circle c -> Math.PI * c.radius() * c.radius();
            case Square sq -> sq.side() * sq.side();
            case Triangle t -> 0.5 * t.base * t.height;
        };
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask what happens if a new subtype is added to the permits clause but the switch statement isn\'t updated — the compiler flags the switch as non-exhaustive, forcing the developer to handle the new case explicitly.'
      }
    }
  },
  {
    id: 'java-q100',
    topicSlug: 'java',
    title: 'What are Virtual Threads (Project Loom, Java 21), and how do they differ from platform (OS) threads?',
    difficulty: 'Advanced',
    theoreticalAnswer: [
      'Quick Answer: Virtual threads are lightweight, JVM-managed threads that are multiplexed onto a small number of underlying OS ("platform") threads by the JVM\'s scheduler.',
      'They allow millions of concurrent virtual threads because they\'re cheap to create and don\'t block their underlying OS carrier thread during blocking I/O operations.',
      'When a virtual thread performs a blocking operation (e.g., I/O), the JVM "unmounts" it from its carrier thread, freeing that carrier to run other virtual threads.'
    ],
    primaryApproach: {
      title: 'Code Example',
      description: 'Virtual Threads.',
      codeSnippet: {
        language: 'java',
        code: `import java.util.concurrent.*;
public class VirtualThreadDemo {
    public static void main(String[] args) throws InterruptedException {
        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 100_000; i++) { // trivially cheap to spawn at this scale
                int id = i;
                executor.submit(() -> {
                    try { Thread.sleep(10); } catch (InterruptedException ignored) { } // doesn't pin carrier thread
                });
            }
        } // executor auto-closes, awaiting task completion
        System.out.println("All virtual thread tasks completed");
    }
}`,
        explanation: 'Interviewer Follow-Up Tip / Trap: Trap: ask when virtual threads are not a good fit — CPU-bound, computationally intensive tasks gain nothing from virtual threads (no blocking to yield during).'
      }
    }
  }
];
