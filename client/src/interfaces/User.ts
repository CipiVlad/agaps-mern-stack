export interface User {
    _id: string;
    email: string;
    username: string;
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