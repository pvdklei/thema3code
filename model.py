from scipy.optimize import fsolve, minimize
import numpy as np
import matplotlib.pyplot as plt

def player(start_vals=(0.5, 0.5, 0.5, 0.5), earnings=(0, 1, 3, 5), player_b=False):

    # switch pains/earnigns
    if player_b:
        earnings = list(earnings)
        i = earnings[0]
        earnings[0] = earnings[3]
        earnings[3] = i

    m = earnings

    def calc_e(e):
        e1, e2, e3, e4 = e
        before = np.array([*start_vals,
                           0, 0, 0, 0])

        change = np.array([-(e1 + e2), -(e3 + e4),
                           -(e1 + e3), -(e2 + e4),
                           e1, e2, e3, e4])

        end = before + change

        molefrac = end / np.sum(end)

        KA11 = molefrac[4] / (molefrac[0] * molefrac[2])
        KA12 = molefrac[5] / (molefrac[0] * molefrac[3])
        KA21 = molefrac[6] / (molefrac[1] * molefrac[2])
        KA22 = molefrac[7] / (molefrac[1] * molefrac[3])

        KA11_ = np.exp(-m[1])
        KA12_ = np.exp(-m[3])
        KA21_ = np.exp(-m[0])
        KA22_ = np.exp(-m[2])

        return KA11 - KA11_, KA12 - KA12_, KA21 - KA21_, KA22 - KA22_,

    e = fsolve(calc_e, (0, 0, 0, 0))
    e /= sum(e)
    return e

def decider(start_vals, earnings=(-1, -1, -1, -1)):

    m = earnings

    def calc_e(e):
        nege = [-x for x in e]
        before = np.array([*start_vals, 0, 0, 0, 0])
        change = np.array([*nege, *nege, *e])
        end = before + change
        molefrac = end / np.sum(end)

        KD11 = molefrac[8] / (molefrac[0] * molefrac[4])
        KD12 = molefrac[9] / (molefrac[1] * molefrac[5])
        KD21 = molefrac[10] / (molefrac[2] * molefrac[6])
        KD22 = molefrac[11] / (molefrac[3] * molefrac[7])

        KD11_ = np.exp(-m[1])
        KD12_ = np.exp(-m[0])
        KD21_ = np.exp(-m[3])
        KD22_ = np.exp(-m[2])

        return KD11 - KD11_, KD12 - KD12_, KD21 - KD21_, KD22 - KD22_,

    e = fsolve(calc_e, (0, 0, 0, 0))
    e /= e.sum()
    return e

def monetary_perception(m, p1=0.98, p2=3.06):
    return -p1 * np.log(m/p2)

def model(*start, 
          earnings=(0.01,1,3,5), 
          monetary_perception=lambda x: x):

    assert len(start) == 4

    earnings = np.array(earnings)
    earnings = monetary_perception(earnings) 
        
    aa1, ab1, ba1, bb1 = start

    A = player(start_vals=(aa1, 1-aa1, ab1, 1-ab1), earnings=earnings)
    B = player(start_vals=(ba1, 1-ba1, bb1, 1-bb1), earnings=earnings, player_b=True)
    D = decider([*A, *B])
    return D

def fit_bias(*D, comp_coop_rate=0.5, **params):

    def function_to_minimize(start):
        """start here is a1 and b1 from A's point of view"""
        return np.linalg.norm(model(*start, 0.5, comp_coop_rate,  **params) - np.array(D))
    
    return minimize(function_to_minimize, (0.5, 0.5))

    
def show_D(D):
    labels = "D11 D12 D21 D22".split()
    x_pos = np.arange(len(labels))
    plt.bar(x_pos, D)
    plt.xticks(x_pos, labels)
    plt.show()

if __name__ == "__main__":
    D = model(0.5, 0.5, 0.5, 0.5, earnings=(0.01, 1, 3, 5))
    Da = model(0.5, 0.5, 0.5, 0.5, earnings=(0.01, 1, 2, 3))
    print("0-1-3-5", D)
    print("0-1-2-3", Da)
    show_D(D)
        


