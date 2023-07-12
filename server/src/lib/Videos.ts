export default class Video {
    static videos: any[] = [];

    static setVideos(videos: any[]) {
        this.videos = videos;
    }
    
    static getVideos() {
        return this.videos;
    }
}