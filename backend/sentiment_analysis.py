from transformers import pipeline
import re

def analyze_swot(text):
    sentiment_classifier = pipeline('sentiment-analysis')

    swot_analysis = {
        'strengths': [],
        'weaknesses': [],
        'opportunities': [],
        'threats': []
    }

    positive_keywords = ['opportunity', 'potential', 'expansion', 'growth', 'innovation', 'collaboration']
    negative_keywords_weaknesses = ['reliance', 'challenge', 'limited', 'weakness']
    negative_keywords_threats = ['intense competition', 'economic downturns', 'regulatory changes', 'threat']
    positive_strength_keywords = ['skilled', 'innovative', 'high-quality', 'competitive advantage', 'strong brand presence', 'commitment to sustainability', 'robust and scalable IT infrastructure', 'continuous employee training and development', 'established partnerships']
    positive_opportunities_keywords = ['rapidly growing market', 'excellent opportunities', 'partnerships', 'collaboration']

    for statement in text.split('\n'):
        cleaned_statement = re.sub(r'[^\w\s]', '', statement.lower())

        sentiment_result = sentiment_classifier(cleaned_statement)
        sentiment_label = sentiment_result[0]['label']
        sentiment_score = sentiment_result[0]['score']

        # Adjust the threshold based on your needs
        threshold = 0.8

        # Categorize statements based on sentiment score and keywords
        if any(keyword in cleaned_statement for keyword in positive_keywords):
            category = 'opportunities' if sentiment_score > threshold else 'strengths'
        elif any(keyword in cleaned_statement for keyword in negative_keywords_weaknesses):
            category = 'weaknesses' if sentiment_score > threshold else 'threats'
        elif any(keyword in cleaned_statement for keyword in negative_keywords_threats):
            category = 'threats' if sentiment_score > threshold else 'weaknesses'
        elif any(keyword in cleaned_statement for keyword in positive_strength_keywords):
            category = 'strengths' if sentiment_score > threshold else 'opportunities'
        elif any(keyword in cleaned_statement for keyword in positive_opportunities_keywords):
            category = 'opportunities' if sentiment_score > threshold else 'strengths'
        else:
            category = None

        # Add to the appropriate category
        if category:
            swot_analysis[category].append({'text': statement, 'sentiment': sentiment_label, 'score': sentiment_score})

    return swot_analysis

# Example usage
if __name__ == '__main__':
    text = """
    1. Our company has a highly skilled and innovative team that consistently delivers high-quality products.
    2. One of our weaknesses is our reliance on a single supplier for critical components.
    3. The market is growing rapidly, providing us with excellent opportunities for expansion.
    4. Intense competition in the industry poses a threat to our market share.
    5. We face challenges in adapting to emerging technologies, which could be a weakness.
    6. Economic downturns may impact consumer spending, posing a threat to our revenue.
    7. Regulatory changes in the industry could create both challenges and opportunities for us.
    8. Our strong brand presence gives us a competitive advantage in the market.
    9. Limited market reach is a weakness that we need to address to maximize growth.
    10. Partnerships with other businesses present opportunities for collaboration and growth.
    

    """

    swot_result = analyze_swot(text)
    print("SWOT Analysis:")
    print("Strengths:", swot_result['strengths'])
    print("Weaknesses:", swot_result['weaknesses'])
    print("Opportunities:", swot_result['opportunities'])
    print("Threats:", swot_result['threats'])
