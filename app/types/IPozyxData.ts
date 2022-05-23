export type IPozyxData = {
    version: string,
    tagId: string,
    timestamp: number,
    success: boolean,
    data: {
      coordinates: {
        x: number,
        y: number,
        z: number
      },
      orientation: {
        yaw: number,
        roll: number,
        pitch: number
      },
      tagData: {},
      metrics: {
        latency: number,
        rates: {
          success: number,
          update: number
        }
      },
      zones: []
    }
  }