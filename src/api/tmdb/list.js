const list = (tmdbHttp) => {
    return {
        async findAll(accountID) {
            return tmdbHttp.get(`/4/account/${accountID}/lists`);
        },
        async getSpecial(listType, accountID) {
            const specialLists = {
                async archive() {
                    const { results: lists } = await list(tmdbHttp).findAll(accountID);
                    let archiveListID = lists.find((listItem) => {
                        return listItem.name.includes('Archive') && listItem.name.includes('Created by LastScene');
                    })?.id;
                    if (!archiveListID) {
                        archiveListID = await list(tmdbHttp).create({
                            name: 'Archive - Created by LastScene',
                            iso_639_1: 'en'
                        });
                    }
                    return (await list(tmdbHttp).get(archiveListID)).results;
                }
            };
            if (!specialLists[listType]) throw new Error(`${listType} does not exist in special lists`);
            return specialLists[listType]();
        },
        async get(listID) {
            return tmdbHttp.get(`/4/list/${listID}`);
        },
        async create(listData) {
            const { id } = await tmdbHttp.post('/4/list', listData);
            return id;
        }
    };
};

export default list;
