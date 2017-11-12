import json
from pprint import pprint

data = json.load(open('productKeywords.json'))
arr = []

for x in range(len(data)):

    for y in range(len(data[x]["keywords"])):

        arr.append(data[x]['keywords'][y])


arr = list(set(arr))

with open('keywords.json', 'w') as outfile:
    json.dump(arr, outfile)

