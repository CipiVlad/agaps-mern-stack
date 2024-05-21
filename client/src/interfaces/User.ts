export interface User {
    _id: string;
    email: string;
    username: string | null;
    password: string | null;
    savedCourses: [];
    gameModes: {
        singleMode: [];
        teamMode: {
            twoVStwo: {
                strokePlay: [];
                matchPlay: [];
                comboPlay: [];
            };
            singleScramble: [];
        };
    };
    peers: [];
    stats: {};
}