describe('rest parameters', () => {

  it('catch non-specified params', () => {
    function resty(first, second, ...others) {
      return others
    }

    // finally, there's no way in TypeScript to invoke a function with wrong arguments
    // (however, these were valid in ES5/ES6)
    // comment out the lines where 'resty' is invoked with too few parameters
    expect(resty().length).toBe(0)
    expect(resty(1).length).toBe(0)
    expect(resty(1, 2).length).toBe(0)
    expect(resty(1, 2, 3).length).toBe(1)
    expect(resty(1, 2, 3, undefined, 5, undefined, 7, undefined, 9, 10).length).toBe(8)
  })

  it('has a different length than `arguments`', () => {
    function resty(first, second, ...others) {
      return others.length == arguments.length
    }

    // finally, there's no way in TypeScript to invoke a function with wrong arguments
    // (however, these were valid in ES5/ES6)
    // comment out the lines where 'resty' is invoked with too few parameters
    expect(resty()).toBe(true)
    expect(resty(1)).toBe(false)
    expect(resty(1, 2)).toBe(false)
    expect(resty(1, 2, 3)).toBe(false)
    expect(resty(1, 2, 3, undefined, 5, undefined, 7, undefined, 9, 10)).toBe(false)
  })
})
