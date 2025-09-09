import myAxios from '../axios/myAxios'

export const getTagListAll = () => {
    return myAxios.get('/tags/tagListAll')
}
