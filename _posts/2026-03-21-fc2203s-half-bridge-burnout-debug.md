---
layout: post
permalink: /engineering/fc2203s-half-bridge-burnout-debug/
category: engineering
title: "Debugging FC2203S Half-Bridge MOSFET Burnout"
date: 2026-03-21 21:00:00 +0800
description: "A debugging log for the FC2203S half-bridge driver (open hardware). The first revision, lacking gate-protection diodes, free-wheeling diodes, and a bulk decoupling capacitor, failed quickly — NMOS body-diode breakdown, gate-drain and gate-source shorts. Investigation traced it to overly fast turn-on, residual Vs ringing partly fixed by a 100 uF capacitor, and a MOSFET rating mismatch resolved by a 60 V/80 A part and a re-tuned gate resistor; final turn-on about 400 ns. Also used by the smart-bartender pump driver."
description_en: "A debugging log for the FC2203S half-bridge driver (open hardware). The first revision, lacking gate-protection diodes, free-wheeling diodes, and a bulk decoupling capacitor, failed quickly — NMOS body-diode breakdown, gate-drain and gate-source shorts. Investigation traced it to overly fast turn-on, residual Vs ringing partly fixed by a 100 uF capacitor, and a MOSFET rating mismatch resolved by a 60 V/80 A part and a re-tuned gate resistor; final turn-on about 400 ns. Also used by the smart-bartender pump driver."
description_zh: "FC2203S 半桥驱动（开源硬件）的调试日志。初版缺少栅极保护二极管、续流二极管与 bulk 去耦电容，很快失效——NMOS 体二极管击穿、栅漏与栅源短路。排查定位为开通过快、Vs 残余振铃（100 µF 电容部分缓解），以及 MOSFET 耐压不匹配（改用 60 V/80 A 器件、重调栅极电阻解决），最终开通约 400 ns。智能调酒机泵驱动也使用该电路。"
title_en: "Debugging FC2203S Half-Bridge MOSFET Burnout"
title_zh: "FC2203S 半桥 MOSFET 烧毁调试"
translation_key: fc2203s-half-bridge-burnout-debug
body_lang: zh        # the Markdown body below is written in Chinese
has_zh_content: true
has_en_content: false
tags: 嵌入式 硬件 MOSFET 半桥 调酒机
categories: 工程实践
_styles: ".post-content img, #markdown-content img { max-width: 100%; height: auto; display: block; margin: 1.5em auto; border-radius: 0.375rem; } .post-content figure, #markdown-content figure { margin: 1.5em 0; text-align: center; }"
---

> 这是 [FC2203S 有刷电机半桥驱动](/projects/8_fc2203s/)（开源硬件）的调试笔记，同款驱动也用于[智能调酒机](/projects/7_bartender/)的泵驱动。

## 初版：缺保护，迅速烧毁

初版半桥驱动器省掉了三样东西：MOS 栅极保护二极管、电机两端的续流二极管、电源两端的大电容。测试方法：接泵电机，50% 占空比运行 5 s 再关断，反复执行。短暂测试后烧毁，失效模式：

- NMOS 源极-漏极**体二极管击穿**
- NMOS **栅极-漏极短接**
- NMOS **栅极-源极短接**

## 排查一：开启过快导致误开启

怀疑栅极电阻太小，先看 Vs 波形：

![Vs 波形：开启过快](/assets/img/posts/fc2203s_waveform_1.png){:width="90%"}

明显是 NMOS 开启速度过快导致的误开启。逐渐增大电阻，但 Vs 仍有一个无法消除的震荡（下图紫线）：

![Vs 残余震荡](/assets/img/posts/fc2203s_waveform_2.png){:width="90%"}

## 排查二：电源滤波不足

怀疑电源部分滤波不够，加 100 µF 电容后改善：

![加电容后改善](/assets/img/posts/fc2203s_waveform_3.png){:width="90%"}

## 排查三：MOS 耐压与限流电阻失配

加电容后 NMOS 运行一段时间仍烧毁。原选 30 V / 60 A 型号，换用 60 V / 80 A；但原先适配 30 V NMOS 的限流电阻对新 MOS 不再合适，遂降低限流电阻。10 Ω 电阻下栅极电压上升情况：

![10Ω 电阻开启](/assets/img/posts/fc2203s_waveform_4.png){:width="90%"}

开启时间约 **400 ns**，最终稳定。

## 小结

- 保护元件（栅极保护二极管 / 续流二极管 / 电源大电容）一个都不能省
- 换 MOS 后，限流电阻要按新管子重新匹配
- 最终上管开启时间 ~400 ns

完整设计已开源：[github.com/dgmm-claude/FC2203S-](https://github.com/dgmm-claude/FC2203S-)（GPL-3.0）。
