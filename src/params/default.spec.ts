describe('default parameters', () => {

  it('can be triggered when the incoming argument is undefined', () => {
    function shoot(name = 'Steve') {
      return name
    }

    expect(shoot('Chris')).toBe('Chris')
    expect(shoot(undefined)).toBe('Steve')
    expect(shoot(null)).toBe(null)
    expect(shoot()).toBe('Steve')
  })

  it('are not included in arguments', () => {
    function shoot(name = 'Steve') {
      return arguments.length
    }

    expect(shoot('Chris')).toBe(1)
    expect(shoot(null)).toBe(1)
    expect(shoot()).toBe(0)
  })

  it('can trigger a function call', () => {
    let triggerCount = 0

    function shoot(name = getDefault()) {
      return name
    }

    function getDefault() {
      triggerCount++
      return 'Steve'
    }

    expect(triggerCount).toBe(0)
    expect(shoot('Chris')).toBe('Chris')
    expect(shoot()).toBe('Steve')
    expect(shoot(undefined)).toBe('Steve')
    expect(triggerCount).toBe(2)
  })

  it('can default all arguments, optionally', () => {
    // Modify the method signature of `myFunction` to allow for all args to be optional

    function myFunction({ name = 'bb', age = 0, favoriteBand = 'cc' } = {}) {
      // name = name || 'defined';
      // age = age || 'defined';
      // favoriteBand = favoriteBand || 'defined';

      expect(name).toBeDefined()
      expect(age).toBeDefined()
      expect(favoriteBand).toBeDefined()
    }

    myFunction({ name: 'John', age: 40, favoriteBand: 'The Beatles' })
    myFunction({ name: 'John', age: 40 })
    myFunction({ name: 'John' })
    myFunction({})
    myFunction()
  })

})
