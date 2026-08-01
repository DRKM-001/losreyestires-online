import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Careers | Los Reyes Tires',
  description: 'Join the Los Reyes Tires team in El Cajon, CA. Explore career opportunities in tire sales, installation, and automotive services.',
};

const openPositions = [
  {
    title: 'Tire Technician',
    type: 'Full-Time',
    location: 'El Cajon, CA',
    description: 'Experienced tire technician needed for mounting, balancing, and installation services. Wheel experience is a plus.',
    requirements: [
      '1+ years tire installation experience',
      'Ability to lift 50+ lbs',
      'Valid driver\'s license',
      'Customer service skills',
      'Bilingual (English/Spanish) preferred',
    ],
  },
  {
    title: 'Sales Associate',
    type: 'Full-Time',
    location: 'El Cajon, CA',
    description: 'Help customers find the right tires and discuss wheel options for their vehicles. Great opportunity for someone passionate about automotive service.',
    requirements: [
      'Excellent customer service skills',
      'Automotive or tire knowledge preferred',
      'Bilingual (English/Spanish) required',
      'Computer proficiency',
      'Positive attitude and team player',
    ],
  },
  {
    title: 'Automotive Mechanic',
    type: 'Full-Time',
    location: 'El Cajon, CA',
    description: 'Skilled mechanic to perform alignments, suspension work, brake services, and general automotive repairs.',
    requirements: [
      '2+ years automotive mechanic experience',
      'Alignment and suspension experience',
      'ASE certification preferred',
      'Own tools',
      'Valid driver\'s license',
    ],
  },
];

const benefits = [
  {
    title: 'Competitive Pay',
    description: 'Fair wages based on experience and skill level',
  },
  {
    title: 'Flexible Schedule',
    description: 'Work-life balance with reasonable hours',
  },
  {
    title: 'Growth Opportunities',
    description: 'Learn and advance your career in automotive services',
  },
  {
    title: 'Family Environment',
    description: 'Be part of a close-knit team that values culture and community',
  },
  {
    title: 'Employee Discounts',
    description: 'Discounts on tires, wheels, and services',
  },
  {
    title: 'Training Provided',
    description: 'On-the-job training and skill development',
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-zinc-900 to-zinc-800 text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-zinc-300 mb-8">
              Los Reyes Tires is a family-owned business built on hard work, integrity, and a passion 
              for the local automotive community. Founded by Polo Reyes, we’re looking for
              dedicated individuals to join our growing team in El Cajon, CA.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Work at Los Reyes Tires?</h2>
            <p className="text-lg text-muted-foreground">
              We value our employees and provide a supportive environment to grow your career.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-zinc-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Open Positions</h2>
            
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <Card key={index} className="border-2 hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-2xl mb-2">{position.title}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{position.type}</Badge>
                          <Badge variant="outline">{position.location}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{position.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {position.requirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <Button asChild className="w-full md:w-auto">
                      <a href="tel:619-440-6098">Call to Apply: 619-440-6098</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">How to Apply</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">1. Call or Visit</h3>
                  <p className="text-muted-foreground">
                    Give us a call at{' '}
                    <a href="tel:619-440-6098" className="text-primary hover:underline font-semibold">
                      619-440-6098
                    </a>{' '}
                    or stop by our location at 1245 N 1st St, El Cajon, CA 92021.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">2. Speak with Management</h3>
                  <p className="text-muted-foreground">
                    Talk to our team about the position you’re interested in and share your experience.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">3. Interview</h3>
                  <p className="text-muted-foreground">
                    We’ll schedule an interview to get to know you better and discuss the role in detail.
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold text-lg mb-2">What to Bring:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Resume or work history</li>
                    <li>Valid driver’s license</li>
                    <li>References (if available)</li>
                    <li>Certifications or licenses (if applicable)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-zinc-900 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Our Team?</h2>
            <p className="text-xl text-zinc-300 mb-8">
              We’re always looking for talented, hardworking individuals who are passionate about
              automotive services and customer satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="default" asChild>
                <a href="tel:619-440-6098">Call 619-440-6098</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/contact">Visit Our Location</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Equal Opportunity */}
      <section className="py-8 bg-zinc-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              Los Reyes Tires is an equal opportunity employer. We celebrate diversity and are committed 
              to creating an inclusive environment for all employees. All qualified applicants will receive 
              consideration for employment without regard to race, color, religion, sex, sexual orientation, 
              gender identity, national origin, disability, or veteran status.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
