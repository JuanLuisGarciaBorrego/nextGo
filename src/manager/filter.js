export const changeFilter = (e, content, filters) => {
    //update filter
    let updateGroup = [];
    let updateFilter = null;

    if (content.type === 'radio') {
        let filterChange = null;
        updateGroup = content.data.group.map((item) => {
            if (content.subData.id === item.id) {
                filterChange = {labelDefined: item.label, valueDefined: item.label};
                return {
                    ...item,
                    checked: true
                }
            } else {
                return {
                    ...item,
                    checked: false
                }
            }
        })

        updateFilter = {
            ...content.data,
            group: updateGroup,
            isUsed: true,
            labelDefined: filterChange?.labelDefined,
            valueDefined: filterChange?.valueDefined
        };
    }

    if (content.type === 'text') {
        updateFilter = {
            ...content.data,
            group: [updateGroup],
            isUsed: e.target.value !== '',
            labelDefined: content.data.shortTitle,
            valueDefined: e.target.value
        };
    }

    return filters.map(item => {
        if (item.name === content.data.name) {
            return updateFilter;
        } else {
            return item;
        }
    })
}

export const removeFilter = (filter, filters) => {
    let updateFilter = [];

    if (filter.type === 'radio') {
        const updateGroup = filter.group.map(item => {
            return {
                ...item,
                checked: false,
            }
        })

        updateFilter = {
            ...filter,
            group: updateGroup,
            isUsed: false
        }
    }

    if (filter.type === 'text') {
        updateFilter = {
            ...filter,
            labelDefined: '',
            valueDefined: '',
            isUsed: false
        }
    }

    return filters.map(item => {
        if (item.name === filter.name) {
            return updateFilter
        } else {
            return item;
        }
    })
}

export const searchFilter = (filters) => {
    const parameters = [];

    filters.map(item => {
        if (item.isUsed) {
            parameters[item.name] = item.valueDefined
        }
    })

    return parameters;
}

export default {changeFilter, removeFilter, searchFilter};
