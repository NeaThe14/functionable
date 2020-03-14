import { Functionable } from "../../lib/functionable/index";

class ExampleClass {
	constructor(public name: string, public stats: ExampleClassStats | any) {}
}

class ExampleClassStats {
	constructor(public age: number, public sex: string) {}
}

test("apply: Should configure object correctly", () => {
	let example = Functionable.wrap(
		new ExampleClass("Danil", new ExampleClassStats(19, "Male"))
	);
	expect(
		example
			.apply({ name: "Lina", stats: { age: 18, sex: "Female" } })
			.unwrap()
	).toStrictEqual(
		new ExampleClass("Lina", new ExampleClassStats(18, "Female"))
	);
});

test("also: should return current Functionable", () => {
	expect(new Functionable(1).also(example).unwrap()).toBe(1);
});

test("let: should return correct wrapped lambda result", () => {
	expect(
		Functionable.wrap(1)
			.let(String)
			.unwrap()
	).toBe("1");
});

function example() {}
