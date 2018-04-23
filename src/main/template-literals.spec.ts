describe('Template literals', () => {

  it('should support string interpolation', () => {
    const personPL = {
      name: 'Jarosław',
      friends: ['Antoni', 'Andrzej', 'Krystyna', 'Wiktor']
    }
    const personEN = {
      name: 'Darren',
      friends: ['Greg', 'Sebastian', 'Chloe']
    }
    // construct an arrow function using template literal string interpolation
    const friendsStr = person => `${person.name} has ${person.friends.length} friends: ${person.friends.join(', ')}`

    expect(friendsStr(personPL)).toBe(
      'Jarosław has 4 friends: Antoni, Andrzej, Krystyna, Wiktor'
    )
    expect(friendsStr(personEN)).toBe(
      'Darren has 3 friends: Greg, Sebastian, Chloe'
    )
  })

  it('should support multi-line strings', () => {
    // construct a string with multiple lines without needing escaped newline characters
    const multiLine = `
    Oh
    my
    dear
    so much fun!`

    expect(multiLine).toBe('\n    Oh\n    my\n    dear\n    so much fun!')
  })

  it('should support string escaping', () => {
    // escape a string in a template literal for each of these
    const cc = `Hi
there!`;
    const aa = `This is \`escaped\` backtics`;
    expect(cc).toBe('Hi\nthere!')
    expect(aa).toBe('This is `escaped` backtics')
  })

  // you likely wont often use tagging, but it can be handy!
  it('should call the tagging function', () => {
    const noun = 'World'
    const emotion = 'happy'
    const hello = tagIt`Hello ${noun}! Are you feeling ${emotion} today?`
    expect(hello).toBe('Hello dear World! Are you feeling really happy today?')

    const name = 'John'
    const action = 'take a seat'
    const result = tagIt`Welcome ${name}, feel comfortable and ${action}!`
    expect(result).toBe('Welcome dear John, feel comfortable and really take a seat!')

    function tagIt(literalString, ...interpolatedParts) {
      return literalString.reduce((accumulator, part, i) => {
        let w = "";
        if (i == 1) {
          w = "dear ";
        } else if (i == 2) {
          w = "really ";
        }
        return accumulator + w + interpolatedParts[i - 1] + part
      })
    }
  })

  it('can be curried', () => {
    // Using tagged template strings, write journey function
    // that will accept following 3 template strings
    // and return a string describing the journey

    // function journey(str, ...a) {
    //   console.log(str);

    //   console.log(a);
    //   // return `a b c`;
    // }
    function cook(strs, ...substs) {
      return substs.reduce(
        (prev, cur, i) => prev + cur + strs[i + 1],
        strs[0]
      );
    }
    // function journey(a: TemplateStringsArray, b: TemplateStringsArray, c: TemplateStringsArray) {
    const journey = (...args1: string[]) => (...args2: string[]) => (...args3: string[]) =>
      cook(args1) + ', then ' + cook(args2) + ' and finally ' + cook(args3) + '!';

    expect(journey`Warsaw` `Poznan` `Berlin`).toBe('Warsaw, then Poznan and finally Berlin!')
    expect(journey`Poland` `Czech` `Austria`).toBe('Poland, then Czech and finally Austria!')
    expect(journey`Europe` `Asia` `Australia`).toBe('Europe, then Asia and finally Australia!')
  })
})
