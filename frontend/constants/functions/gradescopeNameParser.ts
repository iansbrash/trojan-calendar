const gradescopeNameParser = (className : string) : string => {
    return className.split(':')[0].split('_').slice(1, 3).map(v => v.toUpperCase()).join(' ');
}

export default gradescopeNameParser;