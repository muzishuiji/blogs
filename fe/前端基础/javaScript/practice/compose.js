const compose = (...fns) => (initialValue) => fns.reduceRight((val, fn) => fn(val), initialValue);
