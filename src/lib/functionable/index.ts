import { SourceIsNotAnObjectException } from "../exceptions";

export class Functionable<T extends Object> {
	constructor(private object: T) {}

	unwrap = () => this.object;

	apply = (source: Partial<T>) => {
		if (!(source instanceof Object)) throw SourceIsNotAnObjectException;
		this.replaceProperties(this.object, source);
		return this;
	};

	// Executes lambda on current object, returns current Functionable
	also = (lambda: Function) => {
		lambda(this.object);
		return this;
	};

	// Executes lambda on current object, returns lambda result wrapped by Functionable
	let = (lambda: Function) => Functionable.wrap(lambda(this.object));

	static wrap = <Y>(object: Y) => new Functionable(object);

	private replaceProperties = (target, source) =>
		Object.keys(source).forEach(key => {
			if (!target[key]) return;
			else if (source[key] instanceof Object && target[key] instanceof Object)
				this.replaceProperties(target[key], source[key]);
			else target[key] = source[key];
		});
}

export const wrap = Functionable.wrap
