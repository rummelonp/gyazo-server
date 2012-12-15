/*
 * jQuery jaTicker ver 1.0.0
 * Copyright (c) 2011 Otchy
 * This source file is subject to the MIT license.
 * http://www.otchy.net
 */
(function($){
	var JT = {
		romanMapSingle: {
			'あ': 'ａ', 'い': 'ｉ', 'う': 'ｕ', 'え': 'ｅ', 'お': 'ｏ',
			'か': 'ｋａ', 'き': 'ｋｉ', 'く': 'ｋｕ', 'け': 'ｋｅ', 'こ': 'ｋｏ',
			'さ': 'ｓａ', 'し': 'ｓｉ', 'す': 'ｓｕ', 'せ': 'ｓｅ', 'そ': 'ｓｏ',
			'た': 'ｔａ', 'ち': 'ｔｉ', 'つ': 'ｔｕ', 'て': 'ｔｅ', 'と': 'ｔｏ',
			'な': 'ｎａ', 'に': 'ｎｉ', 'ぬ': 'ｎｕ', 'ね': 'ｎｅ', 'の': 'ｎｏ',
			'は': 'ｈａ', 'ひ': 'ｈｉ', 'ふ': 'ｆｕ', 'へ': 'ｈｅ', 'ほ': 'ｈｏ',
			'ま': 'ｍａ', 'み': 'ｍｉ', 'む': 'ｍｕ', 'め': 'ｍｅ', 'も': 'ｍｏ',
			'や': 'ｙａ', 'ゆ': 'ｙｕ', 'よ': 'ｙｏ',
			'ら': 'ｒａ', 'り': 'ｒｉ', 'る': 'ｒｕ', 'れ': 'ｒｅ', 'ろ': 'ｒｏ',
			'わ': 'ｗａ', 'を': 'ｗｏ', 'ん': 'ｎｎ',
			'が': 'ｇａ', 'ぎ': 'ｇｉ', 'ぐ': 'ｇｕ', 'げ': 'ｇｅ', 'ご': 'ｇｏ',
			'ざ': 'ｚａ', 'じ': 'ｊｉ', 'ず': 'ｚｕ', 'ぜ': 'ｚｅ', 'ぞ': 'ｚｏ',
			'だ': 'ｄａ', 'ぢ': 'ｄｉ', 'づ': 'ｄｕ', 'で': 'ｄｅ', 'ど': 'ｄｏ',
			'ば': 'ｂａ', 'び': 'ｂｉ', 'ぶ': 'ｂｕ', 'べ': 'ｂｅ', 'ぼ': 'ｂｏ',
			'ぱ': 'ｐａ', 'ぴ': 'ｐｉ', 'ぷ': 'ｐｕ', 'ぺ': 'ｐｅ', 'ぽ': 'ｐｏ',
			'ぁ': 'ｘａ', 'ぃ': 'ｘｉ', 'ぅ': 'ｘｕ', 'ぇ': 'ｘｅ', 'ぉ': 'ｘｏ',
			'っ': 'ｘｔｕ',
			'ゃ': 'ｘｙａ', 'ゅ': 'ｘｙｕ', 'ょ': 'ｘｙ',
			'ゎ': 'ｘｗａ'
		},
		romanMapDouble: {
			'きゃ': 'ｋｙａ', 'きゅ': 'ｋｙｕ', 'きぇ': 'ｋｙｅ', 'きょ': 'ｋｙｏ',
			'くぁ': 'ｋｗａ',
			'しゃ': 'ｓｙａ', 'しゅ': 'ｓｙｕ', 'しぇ': 'ｓｙｅ', 'しょ': 'ｓｙｏ',
			'ちゃ': 'ｔｙａ', 'ちゅ': 'ｔｙｕ', 'ちぇ': 'ｔｙｅ', 'ちょ': 'ｔｙｏ',
			'てゃ': 'ｔｈａ', 'てぃ': 'ｔｈｉ', 'てゅ': 'ｔｈｕ', 'てぇ': 'ｔｈｅ', 'てょ': 'ｔｈｏ',
			'にゃ': 'ｎｙａ', 'にゅ': 'ｎｙｕ', 'にぇ': 'ｎｙｅ', 'にょ': 'ｎｙｏ',
			'ひゃ': 'ｈｙａ', 'ひゅ': 'ｈｙｕ', 'ひぇ': 'ｈｙｅ', 'ひょ': 'ｈｙｏ',
			'みゃ': 'ｍｙａ', 'みゅ': 'ｍｙｕ', 'みぇ': 'ｍｙｅ', 'みょ': 'ｍｙｏ',
			'りゃ': 'ｒｙａ', 'りゅ': 'ｒｙｕ', 'りぇ': 'ｒｙｅ', 'りょ': 'ｒｙｏ',
			'うぃ': 'ｗｉ', 'うぇ': 'ｗｅ',
			'ぎゃ': 'ｇｙａ', 'ぎゅ': 'ｇｙｕ', 'ぎぇ': 'ｇｙｅ', 'ぎょ': 'ｇｙｏ',
			'じゃ': 'ｊａ', 'じゅ': 'ｊｕ', 'じぇ': 'ｊｅ', 'じょ': 'ｊｏ',
			'ぢゃ': 'ｄｙａ', 'ぢゅ': 'ｄｙｕ', 'ぢぇ': 'ｄｙｅ', 'ぢょ': 'ｄｙｏ',
			'びゃ': 'ｂｙａ', 'びゅ': 'ｂｙｕ', 'びぇ': 'ｂｙｅ', 'びょ': 'ｂｙｏ',
			'ぴゃ': 'ｐｙａ', 'ぴゅ': 'ｐｙｕ', 'ぴぇ': 'ｐｙｅ', 'ぴょ': 'ｐｙｏ'
		},
		romanReverseMapSingle: {},
		romanReverseMapDouble: {},
		romanReverseMapTriple: {},
		kanaMap: {
			'ア': 'あ', 'イ': 'い', 'ウ': 'う', 'エ': 'え', 'オ': 'お',
			'カ': 'か', 'キ': 'き', 'ク': 'く', 'ケ': 'け', 'コ': 'こ',
			'サ': 'さ', 'シ': 'し', 'ス': 'す', 'セ': 'せ', 'ソ': 'そ',
			'タ': 'た', 'チ': 'ち', 'ツ': 'つ', 'テ': 'て', 'ト': 'と',
			'ナ': 'な', 'ニ': 'に', 'ヌ': 'ぬ', 'ネ': 'ね', 'ノ': 'の',
			'ハ': 'は', 'ヒ': 'ひ', 'フ': 'ふ', 'ヘ': 'へ', 'ホ': 'ほ',
			'マ': 'ま', 'ミ': 'み', 'ム': 'む', 'メ': 'め', 'モ': 'も',
			'ヤ': 'や', 'ユ': 'ゆ', 'ヨ': 'よ',
			'ラ': 'ら', 'リ': 'り', 'ル': 'る', 'レ': 'れ', 'ロ': 'ろ',
			'ワ': 'わ', 'ヲ': 'を', 'ン': 'ん',
			'ガ': 'が', 'ギ': 'ぎ', 'グ': 'ぐ', 'ゲ': 'げ', 'ゴ': 'ご',
			'ザ': 'ざ', 'ジ': 'じ', 'ズ': 'ず', 'ゼ': 'ぜ', 'ゾ': 'ぞ',
			'ダ': 'だ', 'ヂ': 'ぢ', 'ヅ': 'づ', 'デ': 'で', 'ド': 'ど',
			'バ': 'ば', 'ビ': 'び', 'ブ': 'ぶ', 'ベ': 'べ', 'ボ': 'ぼ',
			'パ': 'ぱ', 'ピ': 'ぴ', 'プ': 'ぷ', 'ペ': 'ぺ', 'ポ': 'ぽ',
			'ァ': 'ぁ', 'ィ': 'ぃ', 'ゥ': 'ぅ', 'ェ': 'ぇ', 'ォ': 'ぉ',
			'ッ': 'っ',
			'ャ': 'ゃ', 'ュ': 'ゅ', 'ョ': 'ょ',
			'ヮ': 'ゎ'
		},
		hiraMap: {},
		asciiChars: ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSYUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
		numChars: '０１２３４５６７８９，．',
		continueChars: 'ー…‥・・',
		startChars: '”（＜［「｛',
		endChars: '、。　”）＞］」｝ ',
		opt: {
			'inputSpeed': 60,
			'convertSpeed': 120,
			'autoStart': true,
			'cursorStr': '|',
			'cursorInterval': 500,
			'hideCursor': false,
			'leaveCursor': false
		}
	};
	var d = document;
	var $e = function(name, cls) {
		var elem = $(d.createElement(name));
		if (!!cls) {
			elem.attr('class', cls);
		}
		return elem;
	}
	for (var r in JT.romanMapSingle) {
		var roman = JT.romanMapSingle[r];
		switch(roman.length) {
			case 1: JT.romanReverseMapSingle[roman] = r; break;
			case 2: JT.romanReverseMapDouble[roman] = r; break;
			case 3: JT.romanReverseMapTriple[roman] = r; break;
		}
	}
	for (var r in JT.romanMapDouble) {
		var roman = JT.romanMapDouble[r];
		switch(roman.length) {
			case 1: JT.romanReverseMapSingle[roman] = r; break;
			case 2: JT.romanReverseMapDouble[roman] = r; break;
			case 3: JT.romanReverseMapTriple[roman] = r; break;
		}
	}
	for (var k in JT.kanaMap) {
		JT.hiraMap[JT.kanaMap[k]] = k;
	}
	JT.Char = function(opt, origin, ruby, roman, isKana) {
		this.origin = origin;
		this.ruby = ruby;
		this.roman = roman;
		this.isKana = !!isKana;
		this.play = function() {
			var char = this;
			var text = char.holder.text();
			switch (char.status) {
			case 0:
				if (text == char.roman.substr(0, char.roman.length - 1)) {
					char.status = 1;
					char.play();
				} else {
					char.holder.append(this.roman.substr(text.length, 1));
					setTimeout(function() {
						char.play();
					}, opt.inputSpeed);
				}
				break;
			case 1:
				char.holder.empty().append(char.ruby);
				char.status = 2;
				setTimeout(function() {
					char.play();
				}, opt.inputSpeed);
				break;
			case 2:
				if (text == char.origin) {
					char.status = 3;
					char.play();
				} else {
					char.holder.empty().append(char.origin);
					char.status = 3;
					setTimeout(function() {
						char.play();
					}, opt.inputSpeed);
				}
				break;
			case 3:
				char.holder.before(text).remove();
				char.word.next();
				break;
			}
		}
		this.start = function() {
			this.holder = $e('span');
			this.status = 0;
			if (!this.roman) {
				this.status = 1;
			}
			if (!this.ruby) {
				this.status = 2;
			}
			this.word.holder.append(this.holder);
			this.play();
		}
		this.next = function() {
			this.index++;
			this.play();
		}
		this.toString = function() {
			var str = this.origin;
			if (!!this.ruby) {
				str += '(' + this.ruby + ')';
			}
			if (!!this.roman) {
				str += '[' + this.roman + ']';
			}
			return str;
		}
	};
	JT.Word = function(opt, parent) {
		this.parent = $(parent);
		this.chars = [];
		this.origin = '';
		this.index = 0;
		this.status = 0;
		this.add = function (char) {
			this.chars.push(char);
			char.word = this;
			this.origin += char.origin;
			if (char.isKana) {
				char.origin = char.ruby;
			}
		}
		this.append = function(word) {
			for (var i=0; i<word.chars.length; i++) {
				this.add(word.chars[i]);
			}
		}
		this.clear = function() {
			this.parent.empty();
			this.index = 0;
			this.status = 0;
		}
		this.play = function() {
			var word = this;
			if (word.index >= word.chars.length) {
				var text = word.holder.text();
				if (text == word.origin) {
					word.status = 1;
				}
				switch (word.status) {
				case 0 :
					word.holder.text(word.origin).removeClass('jaticker-input').addClass('jaticker-convert');
					word.status = 1;
					setTimeout(function() {
						word.play();
					}, opt.convertSpeed);
					break;
				case 1 :
					word.holder.before(text).remove();
					setTimeout(function() {
						if (!!word.block) {
							word.block.next();
						}
					}, opt.convertSpeed);
					break;
				}
			} else {
				word.chars[word.index].start();
			}
		}
		this.start = function() {
			this.holder = $e('span', 'jaticker-input');
			if (this.parent.length > 0) {
				opt.cursor.before(this.parent);
				this.parent.append(this.holder);
			} else {
				opt.cursor.before(this.holder);
			}
			this.play();
		}
		this.next = function() {
			this.index++;
			this.play();
		}
		this.toString = function() {
			var str = this.origin;
			str += '<';
			for (var i=0; i<this.chars.length; i++) {
				str += this.chars[i].toString();
			}
			str += '>';
			return str;
		}
	};
	JT.Block = function(opt, wrapper, parent) {
		var block = this;
		this.wrapper = $(wrapper);
		this.parent = $(parent);
		this.children = [];
		this.index = 0;
		this.initialized = false;
		this.add = function(child) {
			child.block = this;
			this.children.push(child);
		}
		this.wrapper.contents().each(function() {
			var node = $(this);
			switch(node[0].nodeType) {
			case 1 :	// element node
				if (node[0].tagName == 'RUBY') {
					var words = JT.parseRuby(opt, node, parent);
					for (var i=0; i<words.length; i++) {
						block.add(words[i]);
					}
				} else {
					block.add(new JT.Block(opt, node, this));
				}
				break;
			case 3 :	// text node
				var words = JT.parseText(opt, node.text(), parent);
				for (var i=0; i<words.length; i++) {
					block.add(words[i]);
				}
				break;
			}
		});
		this.clear = function() {
			this.parent.empty();
			this.wrapper.empty();
			this.index = 0;
			for (var i=0; i<this.children.length; i++) {
				this.children[i].clear();
			}
		}
		this.play = function() {
			if (this.index >= this.children.length) {
				if (!!this.block) {
					this.block.next();
				} else {
					if (opt.leaveCursor) {
						clearInterval(opt.cursorId);
						opt.cursor.remove();
					}
					if (!!opt.onFinished) {
						opt.onFinished();
					}
				}
				return;
			}
			this.children[this.index].start(true);
		}
		this.start = function(ignoreInit) {
			if (this.initialized) return;
			if (!ignoreInit) {
				this.wrapper.append(opt.cursor);
				if (!opt.hideCursor) {
					opt.cursorId = setInterval(function() {
						switch (opt.cursor.css('visibility')) {
						case 'hidden': opt.cursor.css('visibility', 'visible'); break;
						case 'visible' : opt.cursor.css('visibility', 'hidden'); break;
						}
					}, opt.cursorInterval);
				}
				this.initialized = true;
			}
			if (this.parent.length > 0) {
				opt.cursor.before(this.parent);
				this.parent.append(this.holder);
			} else {
				opt.cursor.before(this.holder);
			}
			this.play();
		}
		this.next = function() {
			this.index++;
			this.play();
		}
		this.toString = function() {
			var str = '';
			if (this.parent.length > 0) {
				str += '[' + this.parent[0].tagName + ']';
			}
			for (var i=0; i<this.children.length; i++) {
				str += this.children[i].toString() + '\n';
			}
			return str;
		}
	}
	JT.parseText = function(opt, text, parent) {
		text = text.replace(/^[\n\t ]+/, ' ').replace(/[\n\t ]+$/, ' ');
		var words = [];
		var lastType = '';
		var currentWord = null;
		for (var i=0; i<text.length; i++) {
			var c1 = text.charAt(i);
			var c2 = i < text.length - 1 ? text.charAt(i+1) : '';
			var isKana1 = !!JT.kanaMap[c1];
			var isKana2 = !!JT.kanaMap[c2];
			var isHira1 = !!JT.hiraMap[c1];
			var isHira2 = !!JT.hiraMap[c2];
			var testChar = testChars = undefined;
			if (isKana1) {
				testChar = JT.kanaMap[c1];
				if (isKana2) testChars = JT.kanaMap[c1] + JT.kanaMap[c2];
			} else if (isHira1) {
				testChar = c1;
				if (isHira2) testChars = c1 + c2;
			}
			var char = origin = ruby = roman = type = undefined;
			if (testChar == 'っ' && (!!testChars)) {
				origin = c1;
				roman = JT.romanMapSingle[testChars.substr(1,1)];
				if (!!roman) {
					ruby = testChar;
					roman = roman.substr(0,1) + roman.substr(0,1);
					char = new JT.Char(opt, origin, ruby, roman, isKana1);
				}
			}
			if (!char && !!testChars) {
				origin = c1 + c2;
				roman = JT.romanMapDouble[testChars];
				if (!!roman) {
					ruby = testChars;
					char = new JT.Char(opt, origin, ruby, roman, isKana1);
					i++;
				}
			}
			if (!char && !!testChar) {
				origin = c1;
				roman = JT.romanMapSingle[testChar];
				if (!!roman) {
					ruby = testChar;
					char = new JT.Char(opt, origin, ruby, roman, isKana1);
				}
			}
			if (!char) {
				origin = c1;
				roman = undefined;
				ruby = undefined;
				char = new JT.Char(opt, origin, ruby, roman, isKana1);
			}
			var endNext = false;
			if (isKana1) {
				type = 'kana';
			} else if (isHira1) {
				type = 'hira';
			} else if (JT.asciiChars.indexOf(c1) >= 0) {
				type = 'ascii';
			} else if (JT.numChars.indexOf(c1) >= 0) {
				type = 'num';
			} else if (JT.continueChars.indexOf(c1) >= 0 || JT.endChars.indexOf(c1) >= 0) {
				switch (lastType) {
				case 'kana' :
				case 'hira' :
					type = lastType;
					break;
				default :
					type = 'other';
				}
				if (JT.endChars.indexOf(c1) >= 0) {
					endNext = true;
				}
			} else if (JT.startChars.indexOf(c1) >= 0) {
				if (isKana2) {
					type = 'kana';
				} else if (isHira2) {
					type = 'hira';
				} else {
					type = 'other';
				}
			} else {
				type = 'other';
			}
			if (type != lastType) {
				currentWord = new JT.Word(opt, parent);
				words.push(currentWord);
				lastType = type;
			}
			currentWord.add(char);
			if (endNext) {
				lastType = '';
			}
		}
		return words;
	}
	JT.parseRuby = function(opt, rubyNode, parent) {
		var words = [];
		var origin = ruby = undefined;
		rubyNode.contents().each(function() {
			var node = $(this);
			if (node[0].nodeType == 3 || node[0].tagName == 'RB') {
				origin = node.text();
			} else if (node[0].tagName == 'RT') {
				ruby = node.text();
			}
			if (!!origin && !!ruby) {
				var texts = JT.parseText(opt, ruby, parent);
				var word = texts[0];
				for (var i=1; i<texts.length; i++) {
					word.append(texts[i]);
				}
				word.origin = origin;
				words.push(word);
				origin = ruby = undefined;
			}
		});
		return words;
	}
	$.fn.jaticker = function(options) {
		return this.each(function(){
			var opt = $.extend({}, JT.opt, options == undefined ? {} : options);
			opt.cursor = $e('span',  'jaticker-cursor').text(opt.cursorStr).css('visibility', 'hidden');
			if (opt.hideCursor) {
				opt.cursor.hide();
			}
			var jaticker = new JT.Block(opt, this);
			$(this).data('jaticker', jaticker);
			jaticker.clear();
			if (opt.autoStart) {
				jaticker.start();
			}
		});
	}
	$.fn.jatickerStart = function(options) {
		return this.each(function(){
			var jaticker = $(this).data('jaticker');
			if (!!jaticker) {
				jaticker.start();
			}
		});
	}
})(jQuery);
