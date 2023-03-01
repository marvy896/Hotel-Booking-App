export interface Room {
    RoomId: number,
    NameOfRoom: string,
    Price: number,
    Image:string,
    Description: string
}

export interface Date {
    getTime(): unknown
    Start: number,
    end: number
}

