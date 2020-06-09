from random import randrange, getrandbits
from itertools import repeat
from functools import reduce

import sys, json, numpy as np

def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])


if __name__=='__main__':
    lines=read_in()
    for ele in lines:
        print(ele)