import { IMissionState } from '../interfaces/mission.state';


export const missionIntialState: IMissionState = {
  missions :
    [
      {
        name: 'Sivan\'s mission',
        description: 'very nice mission',
        tagList: [
          {
            tagName: 'tag name 1',
            keyWords: [
              'key word1', 'keyword2'
            ]
          },
          {
            tagName: 'tag name 2',
            keyWords: [
              'key word1', 'keyword2', 'keyword3'
            ]
          },
          {
            tagName: 'tag name 3',
            keyWords: [
              'key word1'
            ]
          },
          {
            tagName: 'tag name 4',
            keyWords: [
              'key word1', 'keyword2'
            ]
          }
        ],
        status: 'Suspended'
      },
      {
        name: 'COMMINT Drill',
        description: 'Training',
        tagList: [
          {
            tagName: 'tag name 1',
            keyWords: [
              'key word1', 'keyword2'
            ]
          },
          {
            tagName: 'tag name 2',
            keyWords: [
              'key word1', 'keyword2', 'keyword3'
            ]
          }
        ],
        status: 'Active'
      },
      {
        name: 'Peace',
        description: 'jhsdkfg',
        tagList: [
          {
            tagName: 'tag name 1',
            keyWords: [
              'key word1', 'keyword2'
            ]
          },
          {
            tagName: 'tag name 2',
            keyWords: [
              'key word1', 'keyword2', 'keyword3'
            ]
          }
        ],
        status: 'Active'
      }
    ]
};
