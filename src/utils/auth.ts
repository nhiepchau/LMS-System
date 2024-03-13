function auth(userName: string, password: string): boolean {
    if (['admin', 'teacher1', 'teacher2'].includes(userName) && password === 'chaunhu2002') {
        return true;
    }

    return false;
}

export default auth