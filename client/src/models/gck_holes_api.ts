export type gckInput = {
    roundId: number
    score: number
    fairway: "X" | "O"
    green: "X" | "O"
    approach: "Chip" | "Pitch" | "Sand"
    penalty: number
    putts: number
}



export type gckAPI = {
    hole: number,
    par: number
}

export const gckHoles: gckAPI[] = [
    { hole: 1, par: 4 },
    { hole: 2, par: 5 },
    { hole: 3, par: 4 },
    { hole: 4, par: 4 },
    { hole: 5, par: 3 },
    { hole: 6, par: 5 },
    { hole: 7, par: 4 },
    { hole: 8, par: 3 },
    { hole: 9, par: 4 },
    { hole: 10, par: 4 },
    { hole: 11, par: 3 },
    { hole: 12, par: 5 },
    { hole: 13, par: 4 },
    { hole: 14, par: 4 },
    { hole: 15, par: 4 },
    { hole: 16, par: 5 },
    { hole: 17, par: 3 },
    { hole: 18, par: 4 },
]