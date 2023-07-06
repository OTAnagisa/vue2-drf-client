import { Component, Vue } from 'vue-property-decorator';

type User = {
    id: string,
    name: string,
    email: string,
    department_section_name: string,
};

@Component
export default class UserList extends Vue {
    public dialog = false;
    public search = '';
    public headers = [
        { text: 'ID', value: 'id' },
        { text: 'メールアドレス', value: 'email' },
        { text: '名前', value: 'name' },
        { text: '所属', value: 'department_section_name' },
    ];
    public user = {};
    public userList: User[] = [];

    async mounted() {
        const result = await this.axios.get("http://127.0.0.1:8000/api/user-list/");
        this.userList = result.data;
    }

}